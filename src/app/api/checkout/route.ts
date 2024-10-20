import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId, planId } = await request.json();
  
  console.log(userId, planId);

  return NextResponse.json(
    { message: 'Checkout processado com sucesso' },
    { status: 200 }
  );
}