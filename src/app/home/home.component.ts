import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user';
import { GithubService } from '../services/github.service';
import { StorageService } from '../services/storage.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    FontAwesomeModule,
    UserComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class HomeComponent {
  faSearch = faSearch;
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading: boolean = true;
  searchText: string = '';
  githubService: GithubService = inject(GithubService);
  storageService: StorageService = inject(StorageService);
  platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const users = this.storageService.getData('users');
      if (users) {
        this.users = users;
        this.filteredUsers = users;
      }
      this.isLoading = false;
    }
  }

  refreshUsers(users: User[]) {
    this.users = users;
    this.filterUser(this.searchText);
  }

  async searchUser(text: string) {
    this.isLoading = true;
    if (this.users.length > 0) {
      const userFound = this.users.find(
        (e) => e.login.toLowerCase() == text.toLowerCase(),
      );
      if (userFound) {
        console.log('Found');
        alert('Usuário já existente');
      } else if (text == '') {
        alert('Input vazio');
      } else {
        await this.fetchGithubUser(text);
      }
      this.isLoading = false;
      return;
    }
    await this.fetchGithubUser(text);
    this.isLoading = false;
  }

  async fetchGithubUser(text: string) {
    try {
      const user: User = await this.githubService.getGithubUser(text);
      this.users.push(user);

      this.filterUser(text);

      this.storageService.setData('users', this.users);
    } catch (e: any) {
      alert('Usuário não existe');
    }
  }

  filterUser(text: string) {
    this.searchText = text;
    if (!text) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter((user) =>
      user?.login.toLowerCase().includes(text.toLowerCase()),
    );
  }

  trackByFn(index: number) {
    return index;
  }
}
