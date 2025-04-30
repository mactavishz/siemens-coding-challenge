async function getCounter(): Promise<GetCounterResponse> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
  const response = await fetch(`${backendUrl}/counter/get`)
  if (!response.ok) {
    throw new Error('Failed to fetch counter')
  }
  return response.json()
}

async function incrementCounter(): Promise<void> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
  const response = await fetch(`${backendUrl}/counter/increment`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to increment counter')
  }
  return response.json()
}

export default {
  getCounter,
  incrementCounter
}

export interface CounterApi {
  getCounter: () => Promise<number>
  incrementCounter: () => Promise<void>
}

export interface GetCounterResponse {
  value: number
}
