import { Component, OnInit, Input, HostBinding, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';
import { MatDialog } from '@angular/material/dialog';
import { ItemsListComponent } from '../items-list/items-list.component';
import { FedCatsCounterOverlayService } from 'src/app/services/fed-cats-counter-overlay.service';
import { MatButton } from '@angular/material/button';
import { SubSink } from 'subsink';
import { CounterOverlayService } from '../../services/counter-overlay.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import firebase from 'firebase/app';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef;
  @HostBinding('class') class = 'app-task-item mat-elevation-z1';
  @Input() task: Task;

  isEditing = false;

  holdingProgress = 0;
  holdingAnimFrameID: number;
  holdingCancelled = false;
  holdingDelayProgress = 0;
  holdingTick = 0;

  subs = new SubSink();

  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    private fedCatsCounterService: FedCatsCounterOverlayService,
    private counterCountService: CounterOverlayService
  ) {}

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  mouseDownListener() {
    if (!this.task.isFinished) {
      this.holdingCancelled = false;
      this.holdingDelayProgress = 0;
      this.holdingTick = 0;
      this.holdingAnimFrameID = requestAnimationFrame(this.updateHoldingProgress.bind(this));
    }
  }

  @HostListener('touchmove')
  @HostListener('touchend')
  @HostListener('mouseup')
  mouseUpListener() {
    if (!this.task.isFinished) {
      this.holdingCancelled = true;
      this.holdingDelayProgress = 0;
      this.holdingTick = 0;
      this.holdingProgress = 0;
    }
  }

  updateHoldingProgress() {
    if (!this.task.isFinished) {
      if (this.holdingCancelled) {
        cancelAnimationFrame(this.holdingAnimFrameID);
      } else if (this.holdingProgress < 1) {
        if (this.holdingDelayProgress < 25) {
          this.holdingAnimFrameID = requestAnimationFrame(this.updateHoldingProgress.bind(this));
          this.holdingDelayProgress++;
        } else {
          const t = this.holdingTick / 70;
          this.holdingProgress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          this.holdingAnimFrameID = requestAnimationFrame(this.updateHoldingProgress.bind(this));
          this.holdingTick++;
        }
      } else {
        this.changeTaskStatus();
        cancelAnimationFrame(this.holdingAnimFrameID);
      }
    }
  }

  ngOnInit() {
    this.holdingProgress = this.task.isFinished ? 1 : 0;
  }

  changeMode(isEditingMode: boolean) {
    this.isEditing = isEditingMode;

    if (isEditingMode) {
      setTimeout(() => focusOnInput(this.nameInput.nativeElement), 0);
    }
  }

  openItemsList(itemsName: string) {
    this.dialog.open(ItemsListComponent, {
      width: '90%',
      data: { itemsType: itemsName }
    });
  }

  openFedCatsCounter(matBtn: MatButton) {
    const dialogRef = this.fedCatsCounterService.open(matBtn._elementRef, this.task.countOfFedCats);
    this.subs.sink = dialogRef.aftefClosed.subscribe(fedCatsCount => {
      if (fedCatsCount !== undefined && this.task.countOfFedCats !== fedCatsCount) {
        const newTask = { ...this.task, countOfFedCats: fedCatsCount } as Task;
        this.tasksService.updateTask(newTask);
      }
    });
  }

  openCounter(matButton: MatButton) {
    const dialogRef = this.counterCountService.open(matButton._elementRef, this.task.counterCount);
    this.subs.sink = dialogRef.aftefClosed.subscribe(counterCount => {
      if ((!!counterCount || counterCount === 0) && this.task.counterCount !== counterCount) {
        const updatedTask = { ...this.task, counterCount };
        this.tasksService.updateTask(updatedTask);
      }
    });
  }

  setPlannedDate(e: MatDatepickerInputEvent<Date>) {
    const updatedTask = { ...this.task, plannedDate: firebase.firestore.Timestamp.fromDate(e.value) };
    this.tasksService.updateTask(updatedTask);
  }

  getDistance(plannedDate: Date): string {
    return formatDistance(new Date(), plannedDate);
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

    if (!this.task.isFinished) {
      this.holdingProgress = 0;
    } else {
      this.holdingProgress = 1;
    }
  }

  async deleteTask() {
    await this.tasksService.delete(this.task.id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
