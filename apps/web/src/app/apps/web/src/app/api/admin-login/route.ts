import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', process.env.ADMIN_PASSWORD!, {
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}