import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    user: {
      id: "1",
      name: "Admin",
      email: process.env.MOCK_EMAIL,
    },
  });
}