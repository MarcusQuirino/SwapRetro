const createURL = (path: string) => {
  return window.location.origin + path
}

export async function getQuestion() {
  const response = await fetch(new Request(createURL('/api/ai')), { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = (await response.json()) as { data: string }
  return data.data
}
