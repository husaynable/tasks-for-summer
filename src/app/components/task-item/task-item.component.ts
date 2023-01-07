import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  OnDestroy,
  HostListener,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { filter, fromEvent, merge, Observable, take } from 'rxjs';
import { formatDistance } from 'date-fns';
import { SubSink } from 'subsink';

import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';
import { FedCatsCounterOverlayService } from 'src/app/services/fed-cats-counter-overlay.service';

import { ItemsListComponent } from '../items-list/items-list.component';
import { CounterOverlayService } from '../../services/counter-overlay.service';
import { Timestamp } from '@angular/fire/firestore';
import { DocumentEventsService } from '../../services/document-events.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') public nameInput?: ElementRef;
  @HostBinding('class') class = 'app-task-item mat-elevation-z1';
  @Input() public task!: Task;

  public isEditing = false;

  public holdingProgress = 0;

  subs = new SubSink();

  private isMouseDown: boolean = false;
  private startX?: number;
  private itemTransformX: number = 0;
  private lastX?: number;
  private isMovingHorizontally?: boolean;
  private openStateReached: boolean = false;

  constructor(
    private elRef: ElementRef,
    private tasksService: TasksService,
    private dialog: MatDialog,
    private fedCatsCounterService: FedCatsCounterOverlayService,
    private counterCountService: CounterOverlayService,
    private ngZone: NgZone,
    private documentEventsService: DocumentEventsService
  ) {}

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  mouseDownListener(event: PointerEvent) {
    this.isMouseDown = true;
    this.startX = event.clientX;
    this.lastX = this.startX;
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  pointerUpListener() {
    if (!this.openStateReached) {
      this.hideActions();
      this.toInitialState();
    }
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.subs.sink = merge(
        fromEvent<PointerEvent>(this.elRef.nativeElement, 'mousemove'),
        fromEvent<PointerEvent>(this.elRef.nativeElement, 'touchmove')
      )
        .pipe(filter((ev) => this.validateForSwiper(ev)))
        .subscribe((event) => {
          requestAnimationFrame(() => {
            const swipeDelta = event.clientX - this.lastX!;
            this.itemTransformX += swipeDelta;
            if (Math.abs(this.itemTransformX) > 150) {
              this.itemTransformX = this.itemTransformX < 0 ? -150 : 150;
              this.openStateReached = true;
              this.isMouseDown = false;
              this.isMovingHorizontally = undefined;
              this.subscribeToActionsHiding();
            } else {
              this.openStateReached = false;
            }
            this.elRef.nativeElement.style.transform = `translateX(${this.itemTransformX}px)`;
            this.lastX = event.clientX;
          });
        });
    });
  }

  changeMode(isEditingMode: boolean) {
    this.isEditing = isEditingMode;

    if (isEditingMode) {
      setTimeout(() => focusOnInput(this.nameInput?.nativeElement), 0);
    }
  }

  openItemsList(itemsName?: string) {
    this.dialog.open(ItemsListComponent, {
      width: '90%',
      data: { itemsType: itemsName },
    });
  }

  openFedCatsCounter(matBtn: MatButton) {
    const dialogRef = this.fedCatsCounterService.open(matBtn._elementRef, this.task.countOfFedCats);
    this.subs.sink = dialogRef.aftefClosed.subscribe((fedCatsCount) => {
      if (fedCatsCount !== undefined && this.task.countOfFedCats !== fedCatsCount) {
        const newTask = { ...this.task, countOfFedCats: fedCatsCount } as Task;
        this.tasksService.updateTask(newTask);
      }
    });
  }

  openCounter(matButton: MatButton) {
    const dialogRef = this.counterCountService.open(matButton._elementRef, this.task.counterCount);
    this.subs.sink = dialogRef.aftefClosed.subscribe((counterCount) => {
      if ((!!counterCount || counterCount === 0) && this.task.counterCount !== counterCount) {
        const updatedTask = { ...this.task, counterCount };
        this.tasksService.updateTask(updatedTask);
      }
    });
  }

  setPlannedDate(e: MatDatepickerInputEvent<Date>) {
    const updatedTask = { ...this.task, plannedDate: Timestamp.fromDate(e.value ?? new Date()) };
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
      isFinished: !this.task.isFinished,
    });

    if (!this.task.isFinished) {
      this.holdingProgress = 0;
    } else {
      this.holdingProgress = 1;
    }
  }

  async deleteTask() {
    await this.tasksService.delete(this.task.id!);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private validateForSwiper(event: PointerEvent): boolean {
    if (!this.isMouseDown) {
      return false;
    }

    if (this.isMovingHorizontally == null) {
      this.isMovingHorizontally = Math.abs(event.movementX) > Math.abs(event.movementY);
    }

    if (!this.isMovingHorizontally) {
      return false;
    }

    return true;
  }

  private hideActions(): void {
    this.elRef.nativeElement.style.transform = 'none';
  }

  private toInitialState(): void {
    this.isMouseDown = false;
    this.isMovingHorizontally = undefined;
    this.startX = undefined;
    this.lastX = undefined;
    this.itemTransformX = 0;
  }

  private subscribeToActionsHiding(): void {
    merge(this.escKeySubscriber).subscribe(() => {
      this.openStateReached = false;
      this.hideActions();
      this.toInitialState();
    });
  }

  private get escKeySubscriber(): Observable<KeyboardEvent> {
    return this.documentEventsService.subscribeToEvent<KeyboardEvent>('keyup').pipe(
      filter((ev) => ev.key === 'Escape'),
      take(1)
    );
  }
}
