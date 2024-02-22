"use client";

import React from "react";
//import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

export const sendEmail = async (formData: FormData) => {
  const email = formData.get("email");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(email, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }
  try {
    // Sending email request to api gateway in AWS
    const messageData = { email, message };
    const res = await fetch(
      `https://rqj9zspbai.execute-api.us-east-1.amazonaws.com/serverless_lambda_resend_email_stage/sendEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      }
    );
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
  return {};
};
