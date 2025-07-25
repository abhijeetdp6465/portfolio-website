import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email to you (admin)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Thank-you email to sender
await transporter.sendMail({
  from: `"MotionPix India" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Thank you for contacting MotionPix India!`,
  html: `
    <div style="max-width:600px;margin:0 auto;padding:20px;background-color:#f9f9f9;font-family:Arial,sans-serif;color:#333;border:1px solid #e0e0e0;border-radius:8px;">
      <div style="text-align:center;">
        <img src="https://motionpixindia.com/Logo.png" alt="MotionPix India Logo" style="max-width:150px;margin-bottom:20px;" />
      </div>
      <h2 style="color:#111;">Hi ${name},</h2>
      <p style="font-size:16px;line-height:1.5;">
        Thank you for getting in touch with <strong>Motion <span style="color:#007bff;">Pix</span> India</strong>. We have received your message and our team will get back to you as soon as possible.
      </p>
      <p style="font-size:16px;line-height:1.5;">
        If your inquiry is urgent, feel free to reach out to us directly at <a href="mailto:${process.env.EMAIL_USER}" style="color:#007bff;text-decoration:none;">${process.env.EMAIL_USER}</a>.
      </p>
      <div style="margin:30px 0;">
        <hr style="border:none;border-top:1px solid #ddd;" />
      </div>
      <p style="font-size:14px;color:#777;">
        <em>This is an automated response. We appreciate your patience.</em>
      </p>
      <p style="font-size:16px;">
        Best regards,<br/>
        <strong>Team MotionPix India</strong>
      </p>
      <div style="margin-top:40px;text-align:center;font-size:12px;color:#aaa;">
        © ${new Date().getFullYear()} MotionPix India. All rights reserved.
      </div>
    </div>
  `,
});


    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
