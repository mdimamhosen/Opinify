import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import brcypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const isUserExistWithUsername = await User.findOne({
      username,
      isVerified: true,
    });

    if (isUserExistWithUsername) {
      return Response.json(
        { success: false, message: "Username already exists" },
        {
          status: 400,
        }
      );
    }

    const isUserExistWithEmail = await User.findOne({
      email,
    });

    if (isUserExistWithEmail) {
      if (isUserExistWithEmail.isVerified) {
        return Response.json(
          { success: false, message: "Email already exists" },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await brcypt.hash(password, 10);
        isUserExistWithEmail.password = hashedPassword;
        await isUserExistWithEmail.save();

        return Response.json(
          {
            success: true,
            message: "User registered successfully",
          },
          {
            status: 200,
          }
        );
      }
    } else {
      const hashedPassword = await brcypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isAcceptingMessage: true,
        isVerified: true,
        messages: [],
      });
      await newUser.save();

      return Response.json(
        {
          success: true,
          message: "User registered successfully",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      {
        status: 500,
      }
    );
  }
}
