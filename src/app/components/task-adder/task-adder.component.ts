import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';

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
            style({ transform: 'scale(1)', opacity: 1, offset: 1 })
          ])
        )
      ),
      transition('* => hidden', animate('225ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0 })))
    ]),
    trigger('cancelBtnState', [
      state('initial, void, hidden', style({ transform: 'translateX(0)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(-66px) rotate(180deg)' })),
      transition('hidden <=> visible', animate('225ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
  ]
})
export class TaskAdderComponent implements OnInit {
  inputState: 'hidden' | 'visible' = 'hidden';
  newTaskName: string;
  @ViewChild('taskNameInput', { static: false }) taskNameInput: ElementRef;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  toggle() {
    this.newTaskName = null;

    if (this.inputState === 'hidden') {
      this.inputState = 'visible';
      focusOnInput(this.taskNameInput.nativeElement);
    } else {
      this.inputState = 'hidden';
    }
  }

  async addOrToggle() {
    if (!this.newTaskName) {
      this.toggle();
    } else {
      await this.tasksService.addTask({ name: this.newTaskName, isFinished: false });
      this.newTaskName = null;
      this.toggle();
    }
  }
}
