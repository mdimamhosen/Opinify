import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

export async function POST(req: Request, res: Response) {
  await dbConnect();
  try {
    const { username, code } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    console.log(username, code, decodedUsername);
    const user = await User.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const isCodeValid = user.verifyCode === code;
    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid code",
        },
        {
          status: 400,
        }
      );
    }
    const isCodeExpired = new Date() < user.verifyCodeExpire;
    if (!isCodeExpired) {
      return Response.json(
        {
          success: false,
          message: "Code expired",
        },
        {
          status: 400,
        }
      );
    }
    if (isCodeValid && isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log("Error checking verify code", error);
    return Response.json(
      {
        success: false,
        message: "Error checking verify code",
      },
      {
        status: 500,
      }
    );
  }
}
