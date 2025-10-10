import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // 設置 CORS headers，允許 GitHub Pages 調用此 API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理 preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { name, email, line, startDate, endDate, description } = req.body;

  // 建立寄件 transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // 你的 Gmail
      pass: process.env.GMAIL_PASS, // 應用程式密碼
    },
  });

  // 寄信內容
  const mailOptions = {
    from: `"Landing Page 洽詢" <${process.env.GMAIL_USER}>`,
    to: "glenwen.studio@gmail.com",
    subject: `新的洽詢：${name}`,
    text: `
姓名：${name}
Email：${email}
Line ID：${line || "-"}
開案日：${startDate || "-"}
結案日：${endDate || "-"}
需求說明：
${description || "-"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "信件已送出" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "寄信失敗" });
  }
}
