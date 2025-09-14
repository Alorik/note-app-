// app/api/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { noteSchema } from "@/lib/validations";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  await connectDB();
  // Fix: session may be typed as {}, so use optional chaining and fallback
  const userId = (session as any)?.user?.id;
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
  const session = await getServerSession(authOptions as any);
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
  const note = await Note.create({
    userId: (session as any).user.id,
    content: parsed.data.content,
  });
  return NextResponse.json(note);
}
