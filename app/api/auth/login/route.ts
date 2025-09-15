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
    const isPasswordValid = await bcrypt.compare(validateData.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "invalid credentials password" }, { status: 401 });
    }

    //if user is valid 

    return NextResponse.json({
      messgae: "LOGIN SUCCESFULL",
      
    })

  }
}