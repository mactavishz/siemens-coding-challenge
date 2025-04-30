import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import RemoteCounter from '../RemoteCounter.vue'
import apis from '@/apis'

let socketOnHandlers: Record<string, Function> = {}

// Mock the socket.io-client
vi.mock('socket.io-client', () => {
  return {
    io: vi.fn(() => ({
      on: vi.fn((event: string, handler: Function) => {
        socketOnHandlers[event] = handler
      }),
    })),
  }
})

// Mock the APIs module
vi.mock('@/apis', () => ({
  default: {
    getCounter: vi.fn(),
    incrementCounter: vi.fn(),
  },
}))

describe('RemoteCounter', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks()
    socketOnHandlers = {}

    // Default successful API responses
    vi.mocked(apis.getCounter).mockResolvedValue({ value: 5 })
    vi.mocked(apis.incrementCounter).mockResolvedValue()
  })

  it('renders initial counter value from API on mount', async () => {
    const wrapper = mount(RemoteCounter)
    await flushPromises() // Wait for API promise to resolve

    expect(apis.getCounter).toHaveBeenCalledTimes(1)
    expect(wrapper.find('h2').text()).toContain('Current Counter Value: 5')
  })

  it('shows error when API call fails', async () => {
    vi.mocked(apis.getCounter).mockRejectedValue(new Error('API error'))

    const wrapper = mount(RemoteCounter)
    await flushPromises() // Wait for API promise to reject

    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.error').text()).toContain('API error')
  })

  it('calls incrementCounter API when button is clicked', async () => {
    const wrapper = mount(RemoteCounter)
    await flushPromises()

    await wrapper.find('button').trigger('click')

    expect(apis.incrementCounter).toHaveBeenCalledTimes(1)
  })

  it('clears error when X is clicked', async () => {
    vi.mocked(apis.getCounter).mockRejectedValue(new Error('API error'))

    const wrapper = mount(RemoteCounter)
    await flushPromises()

    expect(wrapper.find('.error').exists()).toBe(true)

    await wrapper.find('.error-close-btn').trigger('click')

    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('updates counter when socket emits counterUpdate', async () => {
    // Get the socket mock
    const socketMock = (await import('socket.io-client')).io()

    const wrapper = mount(RemoteCounter)
    await flushPromises()

    // Initially counter should be 5 from the API call
    expect(wrapper.find('h2').text()).toContain('Current Counter Value: 5')

    // Trigger the socket counterUpdate event
    const counterUpdateHandler = socketOnHandlers.counterUpdate
    counterUpdateHandler(10)
    await wrapper.vm.$nextTick()

    // Counter should now reflect the socket update
    expect(wrapper.find('h2').text()).toContain('Current Counter Value: 10')
  })
})
