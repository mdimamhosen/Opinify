import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

interface VerificationEmailProps {
  code: string;
  username: string;
}

export default function VerificationEmail({
  code,
  username,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid #000000",
          }}
        >
          <Heading
            style={{
              color: "#000000",
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Email Verification
          </Heading>
          <Text
            style={{ fontSize: "16px", color: "#000000", marginBottom: "20px" }}
          >
            Hello {username},
          </Text>
          <Text
            style={{ fontSize: "16px", color: "#000000", marginBottom: "20px" }}
          >
            Please use the following verification code to complete your
            registration:
          </Text>
          <Section style={{ textAlign: "center", margin: "20px 0" }}>
            <Text
              style={{
                fontSize: "32px",
                color: "#000000",
                letterSpacing: "4px",
                fontWeight: "bold",
              }}
            >
              {code}
            </Text>
          </Section>
          <Text
            style={{ fontSize: "16px", color: "#000000", marginBottom: "20px" }}
          >
            If you did not request this verification code, please disregard this
            email.
          </Text>
          <Text
            style={{ fontSize: "16px", color: "#000000", marginBottom: "20px" }}
          >
            Thank you for choosing Opinify!
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: "#000000",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Best regards,
            <br />
            The Opinify Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
