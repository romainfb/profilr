import { NextRequest, NextResponse } from 'next/server';
import { registerNewUser } from '@/app/api/auth/auth.service';
import { createProfile } from '@/lib/profile/data';
import { CustomError } from '@/lib/customError';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { username, email, password } = await request.json();
    const user = await registerNewUser({ username, email, password }) as any;
    await createProfile(user?.id as string);
    return NextResponse.json({ user }, { status: 201 });
  } catch (e: any) {
    if (e instanceof CustomError){
      return NextResponse.json({ message: e.message }, { status: e.statusCode });
    }
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
