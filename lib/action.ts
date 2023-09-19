'use server'
import { NextResponse } from 'next/server'
import { askQuestion } from './ai'

export async function fetchQuestion() {
  return await askQuestion()
}
