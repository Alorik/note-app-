import { connectDB } from "@/lib/mongodb";
import { loginSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validateData = loginSchema.parse(body);

    //finding user by email
    const user = await User.findOne({ email: validateData.email });
    if (!user) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    //password comparison
    const isPasswordValid = await bcr

  }
}