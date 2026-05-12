import { UIGroupItem } from './interfaces/UIGroupItem';


export type UIGroupListener = (items: UIGroupItem[]) => void;


export class UIGroupPool {
    private static instance: UIGroupPool;

    public static getInstance(): UIGroupPool {
        if (!UIGroupPool.instance) {
            UIGroupPool.instance = new UIGroupPool();
        }

        return UIGroupPool.instance;
    }

    private groups: Map<string, UIGroupItem[]> = new Map();
    private listeners: Map<string, Set<UIGroupListener>> = new Map();

    private constructor() {}

    private notify(groupId: string): void {
        const items: UIGroupItem[] = this.getItems(groupId);
        const groupListeners: Set<UIGroupListener> | undefined = this.listeners.get(groupId);

        if (groupListeners) {
            groupListeners.forEach((listener: UIGroupListener): void => listener(items));
        }
    }

    /**
     * Registers a listener for a specific group.
     */
    public subscribe(groupId: string, listener: UIGroupListener): void {
        if (!this.listeners.has(groupId)) {
            this.listeners.set(groupId, new Set());
        }

        this.listeners.get(groupId)!.add(listener);
    }

    /**
     * Unregisters a listener.
     */
    public unsubscribe(groupId: string, listener: UIGroupListener): void {
        const groupListeners: Set<UIGroupListener> | undefined = this.listeners.get(groupId);

        if (groupListeners) {
            groupListeners.delete(listener);
        }
    }

    /**
     * Gets the items for a group.
     */
    public getItems(groupId: string): UIGroupItem[] {
        return this.groups.get(groupId) || [];
    }

    /**
     * Sets the items for a group and notifies listeners.
     */
    public setItems(groupId: string, items: UIGroupItem[]): void {
        this.groups.set(groupId, [...items]);
        this.notify(groupId);
    }

    /**
     * Moves an item within a group or between groups.
     */
    public moveItem(
        sourceGroupId: string,
        targetGroupId: string,
        sourceIndex: number,
        targetIndex: number
    ): void {
        const sourceItems: UIGroupItem[] = [...this.getItems(sourceGroupId)];
        const targetItems: UIGroupItem[] = sourceGroupId === targetGroupId 
            ? sourceItems 
            : [...this.getItems(targetGroupId)];

        if (sourceIndex < 0 || sourceIndex >= sourceItems.length) {
            return;
        }

        const [item] = sourceItems.splice(sourceIndex, 1);

        targetItems.splice(targetIndex, 0, item);

        this.setItems(sourceGroupId, sourceItems);

        if (sourceGroupId !== targetGroupId) {
            this.setItems(targetGroupId, targetItems);
        }
    }

    /**
     * Adds an item to a group.
     */
    public addItem(groupId: string, item: UIGroupItem, index?: number): void {
        const items: UIGroupItem[] = [...this.getItems(groupId)];

        if (index !== undefined) {
            items.splice(index, 0, item);
        } else {
            items.push(item);
        }

        this.setItems(groupId, items);
    }

    /**
     * Removes an item from a group by ID.
     */
    public removeItem(groupId: string, itemId: string): void {
        const items: UIGroupItem[] = this.getItems(groupId).filter((item: UIGroupItem): boolean => item.id !== itemId);

        this.setItems(groupId, items);
    }
}
