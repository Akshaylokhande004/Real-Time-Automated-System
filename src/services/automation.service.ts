import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:EMAIL_USER,
    pass:EMAIL_PASS
  }
});
console.log("EMAIL_USER:", EMAIL_USER);
console.log("EMAIL_PASS:", EMAIL_PASS);
export async function sendEmail(to: string, message: string) {
  if (!to) {
    console.log("No email found, skipping...");
    return { status: "skipped" };
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Collaboration Opportunity",
      text: message
    });

    console.log(`Email sent to ${to}`);
    return { status: "sent" };

  } catch (error) {
    console.error("Email failed:", error);
    return { status: "failed" };
  }
}

export async function sendDM(username: string, message: string) {
  console.log(`DM to ${username}: ${message}`);

  return {
    status: "simulated"
  };
}

export async function runOutreachAutomation(creators: any[]) {
  const results = [];

  for (const creator of creators) {
    const email = creator.email || "akshaylokhanderedking@gmail.com";
    const emailResult = await sendEmail(
      email,
      creator.outreach.email
    );

    const dmResult = await sendDM(
      creator.name,
      creator.outreach.instagramDM
    );
    await delay(2000);
    results.push({
      name: creator.name,
      emailStatus: emailResult.status,
      dmStatus: dmResult.status
    });
  }

  return results;
}
function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}