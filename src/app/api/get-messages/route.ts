import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET(req: Request, res: Response) {
  await dbConnect();

  // Get the current session
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Check if the session is valid
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  // Convert the user ID to a MongoDB ObjectId
  const userId = new mongoose.Types.ObjectId(user?._id);
  console.log("userId", userId);

  try {
    // Find the user using aggregation, accounting for empty messages array
    const userAggregate = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          messages: {
            $cond: {
              if: { $isArray: "$messages" },
              then: "$messages",
              else: [],
            },
          },
        },
      },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    // If no messages are found, return a success response with an empty messages array
    if (!userAggregate || userAggregate.length === 0) {
      return Response.json(
        {
          success: true,
          messages: [],
        },
        { status: 200 }
      );
    }

    // Return the messages found
    return Response.json(
      {
        success: true,
        messages: userAggregate[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    // Return a failure response if an error occurs
    console.error("Error fetching messages:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching messages",
      },
      { status: 500 }
    );
  }
}
