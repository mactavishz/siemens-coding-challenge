// a singleton class to store data in memory
export class Store {
    protected static instance: Store;
    private data: Record<string, any>;
    
    protected constructor() {
        this.data = {};
    }

    public static getInstance(): Store {
        if (!Store.instance) {
        Store.instance = new Store();
        }
        return Store.instance;
    }
    
    public set(key: string, value: any): void {
        this.data[key] = value;
    }
    
    public get(key: string): any {
        return this.data[key];
    }
    
    public remove(key: string): void {
        delete this.data[key];
    }
}

export class Counter extends Store {
    protected static instance: Counter;
    
    private constructor() {
        super();
        this.set('count', 0);
    }
    
    public static getInstance(): Counter {
        if (!Counter.instance) {
            Counter.instance = new Counter();
        }
        return Counter.instance;
    }
    
    public increment(): void {
        this.set('count', this.get('count') + 1);
    }
    
    public getCount(): number {
        return this.get('count');
    }
    
    public reset(): void {
        this.set('count', 0);
    }
}

export interface Store {
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
}

export interface Counter extends Store {
    increment(): void;
    getCount(): number;
}