import { Injectable, effect, signal } from '@angular/core';

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

// TODO: evaluar debounce para toggles rápidos cuando haya más ítems.
// import { debounceSignal } from 'signal-utils';

@Injectable({ providedIn: 'root' })
export class ChecklistService {
  readonly items = signal<ChecklistItem[]>([]);
  readonly percentage = signal<number>(0);

  constructor() {
    effect(() => {
      const current = this.items();
      const total = current.length;
      const done = current.filter((i) => i.done).length;
      this.percentage.set(total === 0 ? 0 : Math.round((done / total) * 100));
    });
  }

  setItems(items: ChecklistItem[]): void {
    this.items.set(items);
  }

  toggleItem(id: string): void {
    const current = this.items();
    const item = current.find((i) => i.id === id);
    if (item) {
      item.done = !item.done;
      this.items.set(current);
    }
  }
}
