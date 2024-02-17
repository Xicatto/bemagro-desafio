import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  afterNextRender,
  inject,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user';
import { GithubService } from '../services/github.service';
import { StorageService } from '../services/storage.service';
import { UserComponent } from '../user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  githubService: GithubService = inject(GithubService);
  storageService: StorageService = inject(StorageService);

  constructor(private changeDetector: ChangeDetectorRef) {
    // afterNextRender(() => {
    //   localStorage.clear();
    // });

    afterNextRender(() => {
      const users = this.storageService.getData('users');
      if (users) {
        this.users = users;
      }
      this.isLoading = false;
      this.changeDetector.detectChanges();
    });
  }

  async searchUser(text: string) {
    this.isLoading = true;
    if (this.users != null) {
      const userFound = this.users.find(
        (e) => e.login.toLowerCase() == text.toLowerCase(),
      );
    }
    try {
      const user: User = await this.githubService.getGithubUser(text);
      console.log(user);
      this.users.push(user);

      this.storageService.setData('users', this.users);
    } catch (e: any) {
      console.log(e.message);
    }
    this.isLoading = false;
  }
}
