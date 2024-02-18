import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StorageService } from '../services/storage.service';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations: [
    trigger('backdrop', [
      state(
        'open',
        style({
          opacity: 100,
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
        }),
      ),
      transition('open => closed', [animate('1s ease-in')]),
      transition('closed => open', [animate('1s ease-out')]),
    ]),
  ],
  imports: [FontAwesomeModule, MatExpansionModule, CommonModule, MapComponent],
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
