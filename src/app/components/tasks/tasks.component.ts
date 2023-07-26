import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SettingsComponent } from '../settings/settings.component';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { TaskAdderComponent } from '../task-adder/task-adder.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: true,
  imports: [SettingsComponent, TasksListComponent, TaskAdderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor(private loginService: LoginService) {}

  logout() {
    this.loginService.logOut();
  }
}
