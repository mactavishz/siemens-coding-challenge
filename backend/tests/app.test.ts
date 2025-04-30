import { describe, it, expect, beforeEach, vi } from 'vitest';
import supertest from 'supertest';
import app from '../src/app';
import { Counter } from '../src/model/Store';

// Mock socket.io to avoid actual socket connections during tests
vi.mock('socket.io', () => {
  return {
    Server: vi.fn().mockImplementation(() => ({
      on: vi.fn(),
      to: vi.fn().mockReturnThis(),
      emit: vi.fn()
    }))
  };
});

describe('Counter API Endpoints', () => {
  const request = supertest(app);
  let counter: Counter;
  
  beforeEach(() => {
    counter = Counter.getInstance();
    // Reset counter for each test
    counter.reset();
  });
  
  it('GET /counter/get should return the current counter value', async () => {
    const response = await request.get('/counter/get');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ value: 0 });
  });
  
  it('POST /counter/increment should increment the counter', async () => {
    // First increment
    let response = await request.post('/counter/increment');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Counter incremented' });
    
    // Check the counter was actually incremented
    response = await request.get('/counter/get');
    expect(response.body).toEqual({ value: 1 });
    
    // Second increment
    await request.post('/counter/increment');
    
    // Check the counter was incremented again
    response = await request.get('/counter/get');
    expect(response.body).toEqual({ value: 2 });
  });
});