import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  // host: { 'class': 'mat-elevation-z2' }
})
export class TaskItemComponent implements OnInit {

  @HostBinding('class') class = 'app-task-item mat-elevation-z2';
  @Input() task: Task;

  isEditing = false;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  async changeTaskName(newName: string) {
    await this.tasksService.updateTask({ ...this.task, name: newName });
  }

  async changeTaskStatus() {
    await this.tasksService.updateTask({ ...this.task, isFinished: !this.task.isFinished });
  }
}
