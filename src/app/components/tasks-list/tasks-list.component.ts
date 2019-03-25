import { Component, OnInit, HostBinding } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  @HostBinding('class') class = 'app-tasks-list container';
  tasks: Observable<Task[]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
  }
}
