// app/api/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { noteSchema } from "@/lib/validations";
import mongoose from "mongoose";

export async function GET() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  await connectDB();
  const userId = session?.user?.id as string | undefined;
  if (!userId) {
    return NextResponse.json(
      { error: "User ID not found in session" },
      { status: 401 }
    );
  }
  const notes = await Note.find({ userId }).sort({
    createdAt: -1,
  });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const parsed = noteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  await connectDB();
  const userId = (session as any).user?.id as string | undefined;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      { error: "Invalid or missing user ID" },
      { status: 400 }
    );
  }
  
  const note = await Note.create({
    userId: new mongoose.Types.ObjectId(userId),
    content: parsed.data.content,
    title: parsed.data.title,
  });
  return NextResponse.json(note);
}
