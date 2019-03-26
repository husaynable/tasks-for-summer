import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @HostBinding('class') class = 'app-task-item mat-elevation-z2';
  @Input() task: Task;

  isEditing = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  changeMode(mode: boolean) {
    this.isEditing = mode;

    if (mode) {
      setTimeout(() => focusOnInput(this.nameInput.nativeElement), 0);
    }
  }

  async changeTaskName(newName: string) {
    await this.tasksService.updateTask({ ...this.task, name: newName });
    this.changeMode(false);
  }

  async changeTaskStatus() {
    await this.tasksService.updateTask({
      ...this.task,
      isFinished: !this.task.isFinished
    });
  }

  async deleteTask() {
    await this.tasksService.delete(this.task.id);
  }
}
