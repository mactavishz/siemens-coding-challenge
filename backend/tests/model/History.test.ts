import { describe, it, expect, beforeEach } from 'vitest';
import { History, ActionType, HistoryItem } from '../../src/model/History';

describe('History', () => {
  let history: History;
  const defaultLimit = 5;

  beforeEach(() => {
    // Create a fresh History instance for each test with a limit of 5 items
    history = new History(defaultLimit);
  });

  it('should initialize with an empty history', () => {
    expect(history.getAll()).toHaveLength(0);
  });

  it('should add items to history', () => {
    const item: HistoryItem = {
      timestamp: Date.now(),
      action: ActionType.INC,
      updatedValue: 1
    };
    
    history.add(item);
    expect(history.getAll()).toHaveLength(1);
    expect(history.getAll()[0]).toEqual(item);
  });

  it('should clear the history', () => {
    const item: HistoryItem = {
      timestamp: Date.now(),
      action: ActionType.INC,
      updatedValue: 1
    };
    
    history.add(item);
    expect(history.getAll()).toHaveLength(1);
    
    history.clear();
    expect(history.getAll()).toHaveLength(0);
  });

  it('should enforce the history size limit', () => {
    // Add more items than the limit
    for (let i = 0; i < defaultLimit + 3; i++) {
      history.add({
        timestamp: Date.now() + i,
        action: ActionType.INC,
        updatedValue: i + 1
      });
    }
    
    // Check that the history size remains at the limit
    expect(history.getAll()).toHaveLength(defaultLimit);
    
    // Verify that the oldest items were removed (FIFO)
    expect(history.getAll()[0].updatedValue).toBe(4); // 1,2,3 were removed
    expect(history.getAll()[4].updatedValue).toBe(8); // most recent value
  });
});