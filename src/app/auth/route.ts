import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/options";

export async function GET() {
  const session = await getServerSession(options);

  console.log(session?.user);

  return NextResponse.json({ message: "ok" });
}
