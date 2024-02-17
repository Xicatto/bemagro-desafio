import { Component, Input } from '@angular/core';
import { User } from '../interfaces/user';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() user!: User;
  faTrash = faTrash;

  buttonHandle() {
    console.log('Clicked');
  }

  delete() {
    console.log('Deleted');
  }
}
