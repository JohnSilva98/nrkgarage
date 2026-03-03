import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  // 🔥 MOCK TEMPORÁRIO
  const MOCK_EMAIL = process.env.MOCK_EMAIL;
  const MOCK_PASSWORD = process.env.MOCK_PASSWORD;

  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    return NextResponse.json({
      user: {
        id: "1",
        name: "Admin",
        email: MOCK_EMAIL,
      },
    });
  }

  return NextResponse.json(
    { message: "Email ou senha inválidos" },
    { status: 401 }
  );
}