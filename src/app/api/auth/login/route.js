import { NextResponse } from 'next/server';
import { createToken } from '@/lib/jwt';

export async function POST(request) {
  const { email, password } = await request.json();

  const MOCK_EMAIL = process.env.MOCK_EMAIL;
  const MOCK_PASSWORD = process.env.MOCK_PASSWORD;

  if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
    return NextResponse.json(
      { message: 'Email ou senha inválidos' },
      { status: 401 }
    );
  }

  const token = await createToken({
    id: '1',
    name: 'Admin',
    email,
  });

  const response = NextResponse.json({
    user: { id: '1', name: 'Admin', email },
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  return response;
}