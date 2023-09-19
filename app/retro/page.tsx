'use client'

import { AddTeam } from '@/components/AddTeam'
import { ButtonLoading } from '@/components/ButtonLoading'
import { NameTogle } from '@/components/NameTogle'
import { Button } from '@/components/ui/button'
import { getQuestion } from '@/lib/action'
import { useState } from 'react'
import { shuffle } from '@/lib/utils'

export default function RetroPage() {
  const [created, setCreated] = useState(false)
  const [team, setTeam] = useState<string[]>([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const togleCreate = (teamNames: string[]) => {
    setCreated(!created)
    const randomized = shuffle(teamNames)
    setTeam(prev => [...prev, ...randomized])
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      const data = await getQuestion()
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
      {!created && team.length < 2 && <AddTeam handleClick={togleCreate} />}
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
