import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor() {}

  private url = 'https://api.github.com/users';

  async getGithubUser(user: string): Promise<User> {
    const response = await fetch(`${this.url}/${user}`);
    const data = await response.json();
    if (response.status == 200) {
      return data;
    }
    throw new Error(`${data.message}`);
  }
}
