import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (data: { status: boolean; message: string }) => {
      if (data.status) {
        res
          .status(200)
          .json({ status: true, statusCode: 200, message: "Register success" });
      } else {
        res
          .status(400)
          .json({ status: false, statusCode: 400, message: "Register failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method not allowed" });
  }
}
