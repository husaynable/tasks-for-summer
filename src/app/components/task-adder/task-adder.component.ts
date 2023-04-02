import { Component, ElementRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Timestamp } from '@angular/fire/firestore';

import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';

import { NameGetterComponent } from '../name-getter/name-getter.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css'],
  animations: [
    trigger('inputState', [
      state('initial, void, hidden', style({ opacity: '0', transform: 'scale(0)', width: '0', height: '0' })),
      state('visible', style({ transform: 'scale(1)' })),
      transition(
        '* => visible',
        animate(
          '225ms cubic-bezier(0, 0, 0.2, 1)',
          keyframes([
            style({ transform: 'scale(0)', width: '*', height: '*', opacity: 0, offset: 0 }),
            style({ transform: 'scale(0.9)', opacity: 0.5, offset: 0.5 }),
            style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
          ])
        )
      ),
      transition('* => hidden', animate('225ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0 }))),
    ]),
    trigger('cancelBtnState', [
      state('initial, void, hidden', style({ transform: 'translateX(0)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(-66px) rotate(-360deg)' })),
      transition('hidden <=> visible', animate('225ms cubic-bezier(0, 0, 0.2, 1)')),
    ]),
  ],
})
export class TaskAdderComponent {
  inputState: 'hidden' | 'visible' = 'hidden';
  newTaskName?: string;
  withList = false;
  withCounter = false;
  listName?: string;
  @ViewChild('taskNameInput') taskNameInput?: ElementRef;

  constructor(private tasksService: TasksService, private modal: MatDialog) {}

  toggle() {
    this.withList = false;
    this.withCounter = false;
    this.listName = undefined;
    this.newTaskName = undefined;

    if (this.inputState === 'hidden') {
      this.inputState = 'visible';
      focusOnInput(this.taskNameInput?.nativeElement);
    } else {
      this.inputState = 'hidden';
    }
  }

  async addOrToggle() {
    if (!this.newTaskName) {
      this.toggle();
    } else {
      const task: Task = {
        name: this.newTaskName,
        isFinished: false,
        timestamp: Timestamp.now(),
      };
      if (this.withList) {
        task.list = {
          displayText: this.listName,
          name: this.listName?.trim().replace(' ', '_').toLowerCase(),
          showCount: false,
        };
      }
      if (this.withCounter) {
        task.counterCount = 0;
      }
      await this.tasksService.addTask({ task });
      this.newTaskName = undefined;
      this.toggle();
    }
  }

  withListToggle(checked: boolean) {
    this.withList = checked;
    if (checked) {
      const dialogRef = this.modal.open(NameGetterComponent, { width: '400px', data: { hidePicAttachment: true } });
      dialogRef.afterClosed().subscribe((nameModel) => {
        if (nameModel && nameModel.name) {
          this.listName = nameModel.name;
        } else {
          this.withList = false;
        }
      });
    } else {
      this.listName = undefined;
    }
  }
}
