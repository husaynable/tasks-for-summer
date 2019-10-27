import { Component, OnInit, Input, HostBinding, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ItemsListComponent } from '../items-list/items-list.component';
import { FedCatsCounterOverlayService } from 'src/app/services/fed-cats-counter-overlay.service';
import { MatButton } from '@angular/material/button';
import { ItemsType } from 'src/app/models/items.type';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: false }) nameInput: ElementRef;
  @HostBinding('class') class = 'app-task-item mat-elevation-z1';
  @Input() task: Task;

  isEditing = false;
  holdingProgress = 0;
  progressStop$ = new Subject<void>();

  subs = new SubSink();

  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    private fedCatsCounterService: FedCatsCounterOverlayService
  ) {}

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  mouseDownListener() {
    if (!this.task.isFinished) {
      this.subs.sink = interval(1)
        .pipe(
          filter(v => v > 25),
          takeUntil(this.progressStop$),
          takeWhile(() => this.holdingProgress <= 99)
        )
        .subscribe(() => {
          this.holdingProgress += 1;

          if (this.holdingProgress === 100) {
            this.changeTaskStatus();
          }
        });
    }
  }

  @HostListener('touchmove')
  @HostListener('touchend')
  @HostListener('mouseup')
  mouseUpListener() {
    if (!this.task.isFinished) {
      this.progressStop$.next();
      this.holdingProgress = 0;
    }
  }

  ngOnInit() {
    this.holdingProgress = this.task.isFinished ? 100 : 0;
  }

  changeMode(isEditingMode: boolean) {
    this.isEditing = isEditingMode;

    if (isEditingMode) {
      setTimeout(() => focusOnInput(this.nameInput.nativeElement), 0);
    }
  }

  openItemsList(itemsType: ItemsType) {
    this.dialog.open(ItemsListComponent, {
      width: '90%',
      data: { itemsType }
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
      this.holdingProgress = 100;
    }
  }

  async deleteTask() {
    await this.tasksService.delete(this.task.id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
