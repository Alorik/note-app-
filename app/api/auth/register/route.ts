import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    // DATABASE CONNECTION
    await connectDB();

    // PARSE REQUEST BODY
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email: validatedData.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // HASH PASSWORD
    const hashedPassword: string = await bcrypt.hash(
      validatedData.password,
      10
    );

    // CREATE NEW USER
    const newUser = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });

    // SUCCESS RESPONSE
    return NextResponse.json(
      {
        message: "User created successfully",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    // VALIDATION ERROR
    if (err.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }

    // SERVER ERROR
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
