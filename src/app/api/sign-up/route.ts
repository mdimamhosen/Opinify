import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
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
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        isUserExistWithEmail.verifyCode = verifyCode;
        isUserExistWithEmail.verifyCodeExpire = expiryDate;
        isUserExistWithEmail.password = hashedPassword;
        await isUserExistWithEmail.save();
        const emailResponse = await sendVerificationEmail(
          email,
          username,
          verifyCode
        );
        console.log(emailResponse);
        if (emailResponse.success) {
          return Response.json(
            {
              success: true,
              message: "User registered successfully, verification email sent",
              emailResponse: emailResponse,
            },
            {
              status: 200,
            }
          );
        } else {
          return Response.json(
            { success: false, message: emailResponse.message },
            {
              status: 500,
            }
          );
        }
      }
    } else {
      const hashedPassword = await brcypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifyCodeExpire: expiryDate,
        isAcceptingMessage: true,
        isVerified: true,
        messages: [],
      });
      await newUser.save();

      const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
      );
      if (emailResponse.success) {
        return Response.json(
          {
            success: true,
            message: "User registered successfully, verification email sent",
          },
          {
            status: 200,
          }
        );
      } else {
        return Response.json(
          { success: false, message: emailResponse.message },
          {
            status: 500,
          }
        );
      }
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
