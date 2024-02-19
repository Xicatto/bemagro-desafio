import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user';
import { MapComponent } from '../map/map.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [FontAwesomeModule, CommonModule, MapComponent],
})
export class UserComponent {
  @Input() user!: User;
  @Output() deleteUsersEvent = new EventEmitter<User[]>();
  isOpen = false;

  faTrash = faTrash;
  storageService: StorageService = inject(StorageService);

  toggle() {
    this.isOpen = !this.isOpen;
  }

  buttonHandle() {
    console.log(this.user);
    this.toggle();
  }

  delete() {
    const users = this.storageService.deleteData('users', this.user.login);
    this.deleteUsersEvent.emit(users);
  }
}
