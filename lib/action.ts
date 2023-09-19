'use server'
import { OpenAI } from 'langchain/llms/openai'

export async function getQuestion() {
  const model = new OpenAI({ temperature: 1, modelName: 'gpt-3.5-turbo' })
  return await model.call(
    'You are helping a team of developers know each other better. Your role is to ask a question that makes them share a personal fact about their life. It must be a fun, unique and ligth-hearted question that prompts a conversation. Your response must always contain exclusively the question, no matter what!',
  )
}
