export class History {
    private history: HistoryItem[] = [];
    private limit: number;
    
    constructor(limit: number = 100) {
        this.limit = limit;
        this.history = new Array()
    }
    
    add(item: HistoryItem): void {
        if (this.history.length >= this.limit) {
            this.history.shift(); // Remove the oldest item
        }
        this.history.push(item);
    }
    
    getAll(): HistoryItem[] {
        return this.history;
    }
    
    clear(): void {
        this.history = new Array();
    }
}

export enum ActionType {
   INC, 
}

export interface HistoryItem {
    timestamp: number;
    action: ActionType;
    updatedValue: number;
}

export interface History {
    add(item: HistoryItem): void;
    getAll(): HistoryItem[];
    clear(): void;
}