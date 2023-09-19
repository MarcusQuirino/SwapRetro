'use client'

import { AddTeam } from '@/components/AddTeam'
import { ButtonLoading } from '@/components/ButtonLoading'
import { NameTogle } from '@/components/NameTogle'
import { Button } from '@/components/ui/button'
import { fetchQuestion } from '@/lib/action'
import { askQuestion } from '@/lib/ai'
import { useState } from 'react'

export default function RetroPage() {
  const [created, setCreated] = useState(false)
  const [team, setTeam] = useState<string[]>([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const togleCreate = (teamNames: string[]) => {
    setCreated(!created)
    const randomized = shuffle(teamNames)
    setTeam(prev => [...prev, ...randomized])
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      const data = await fetchQuestion()
      setQuestion(data)
      setLoading(false)
      return
    } catch (error) {
      setQuestion('Oops... Something went wrong, but dont worry, please try again')
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full w-full flex-col items-center p-24 space-y-10 container mx-auto'>
      <p className='text-4xl text-center text-foreground'>{question}</p>
      {!created && team.length < 1 && <AddTeam handleClick={togleCreate} />}
      {created && !loading && (
        <Button
          size='lg'
          onClick={handleClick}
        >
          Generate a Question
        </Button>
      )}
      {loading && <ButtonLoading />}
      {created && team.length > 1 && (
        <ul className='w-80 space-y-1'>
          {team.map((m, key) => (
            <li key={key}>
              <NameTogle name={m} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
