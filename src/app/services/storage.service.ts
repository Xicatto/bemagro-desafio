import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

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

  deleteData(key: string, text: string): any {
    const data: User[] = this.getData(key);
    const index = data.findIndex(
      (e) => e.login.toLowerCase() == text.toLowerCase(),
    );
    data.splice(index, 1);
    this.setData(key, data);
    return data;
  }
}
