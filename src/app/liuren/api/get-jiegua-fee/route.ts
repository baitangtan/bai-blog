import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    payment_method: "free",
    message: "本次免费解读",
  });
}
