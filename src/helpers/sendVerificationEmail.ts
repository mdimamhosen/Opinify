import VerificationEmail from "@/emails/VerificationEmail";
import { resend } from "@/lib/Resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  code: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code | Opinify",
      react: VerificationEmail({ username, code }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.log("Error in sendVerificationEmail", error);
    return {
      success: false,
      message: "Error in send verification email",
    };
  }
}
