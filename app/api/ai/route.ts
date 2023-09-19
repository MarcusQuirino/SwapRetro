import { askQuestion } from '@/lib/ai'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await askQuestion()
  return NextResponse.json({ data })
}
