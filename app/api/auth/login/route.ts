import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { loginSchema } from "@/lib/validations";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // Connect to DB
    await connectDB();

    // Get body
    const body = await req.json();

    // Validate input
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If valid, return success (NextAuth will handle session)
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }

    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
