'use client'

import { AddTeam } from '@/components/AddTeam'
import { ButtonLoading } from '@/components/ButtonLoading'
import { NameTogle } from '@/components/NameTogle'
import { Button } from '@/components/ui/button'
import { getQuestion } from '@/lib/action'
import { useState } from 'react'
import { shuffle } from '@/lib/utils'
import { useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

export default function RetroPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const team = searchParams.get('team')?.split(',') || []
  const question = searchParams.get('question') || ''

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const togleCreate = (teamNames: string[]) => {
    const randomized = shuffle(teamNames)
    router.push(pathname + '?' + createQueryString('team', randomized.join(',')))
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      const data = await getQuestion()
      setLoading(false)
      setText('')
      router.push(pathname + '?' + createQueryString('question', data))
      return
    } catch (error) {
      router.push(
        pathname +
          '?' +
          createQueryString(
            'question',
            'Oops... Something went wrong, but dont worry, please try again',
          ),
      )
      setLoading(false)
    }
  }

  return (
    <div className='flex h-full w-full flex-col items-center p-24 space-y-8 container mx-auto'>
      <h2 className='text-center text-xl'>Question of the day:</h2>
      <Textarea
        className='text-4xl text-cente outline-0 h-48'
        placeholder={question}
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={() => {
          router.push(pathname + '?' + createQueryString('question', text))
        }}
      />
      {team.length < 2 && <AddTeam handleClick={togleCreate} />}
      {team.length > 2 && !loading && (
        <Button
          size='lg'
          onClick={handleClick}
        >
          Generate a Question
        </Button>
      )}
      {loading && <ButtonLoading />}
      {team.length > 1 && (
        <ul className='w-80 space-y-1 h-full overflow-y-scroll'>
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
