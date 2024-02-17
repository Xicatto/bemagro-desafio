import { Injectable, afterNextRender } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getData(key: string): any | null {
    const item = localStorage.getItem(key);
    if (item != null) {
      return JSON.parse(item);
    }
    return null;
  }

  setData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
