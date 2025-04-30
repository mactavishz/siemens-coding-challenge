import { describe, it, expect, beforeEach } from 'vitest';
import { Store, Counter } from '../../src/model/Store';

describe('Store', () => {
  let store: Store;

  beforeEach(() => {
    // Get a fresh store instance for each test
    store = Store.getInstance();
  });

  it('should be a singleton', () => {
    const anotherStore = Store.getInstance();
    expect(store).toBe(anotherStore);
  });

  it('should store and retrieve data', () => {
    store.set('testKey', 'testValue');
    expect(store.get('testKey')).toBe('testValue');
  });

  it('should remove data', () => {
    store.set('testKey', 'testValue');
    store.remove('testKey');
    expect(store.get('testKey')).toBeUndefined();
  });
});

describe('Counter', () => {
  let counter: Counter;

  beforeEach(() => {
    counter = Counter.getInstance();
    // reset the counter for each test
    counter.reset();
  });

  it('should be a singleton', () => {
    const anotherCounter = Counter.getInstance();
    expect(counter).toBe(anotherCounter);
  });

  it('should initialize with count of 0', () => {
    expect(counter.getCount()).toBe(0);
  });

  it('should increment the counter', () => {
    counter.increment();
    expect(counter.getCount()).toBe(1);
    
    counter.increment();
    counter.increment();
    expect(counter.getCount()).toBe(3);
  });
});