import { Injectable } from '@angular/core';
import { StorageService } from './../storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageService {
  private store: Storage;

  constructor() {
    this.store = localStorage;
  }

  getStorageType(): string {
    return "localStorage";
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.getItem(key);
  }

  key(index: number): string | null {
    return this.store.key(index);
  }

  removeItem(key: string): void {
    this.store.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.store.setItem(key, value);
  }
}
