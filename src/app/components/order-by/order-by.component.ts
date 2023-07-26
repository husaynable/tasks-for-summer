import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TasksService } from 'src/app/services/tasks.service';
import { Observable } from 'rxjs';
import { Counts } from '../../models/counts.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatButtonToggleModule],
})
export class OrderByComponent implements OnInit {
  @Output() public changed = new EventEmitter<SortModel>();
  @Output() public filterChanged = new EventEmitter<FilterType>();

  public currentValue: 'timestamp' | 'name' = 'timestamp';
  public currentDirection: 'asc' | 'desc' = 'desc';
  public filter: FilterType = 'all';
  public counts$!: Observable<Counts>;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.counts$ = this.tasksService.getCounts();
  }

  onValChanged(e: MatButtonToggleChange) {
    this.changed.emit({ value: e.value, direction: this.currentDirection });
  }

  onDirChanged(e: MatButtonToggleChange) {
    this.changed.emit({ value: this.currentValue, direction: e.value });
  }

  onFilterChanged(e: MatButtonToggleChange) {
    this.filterChanged.emit(e.value);
  }
}

export interface SortModel {
  value: 'timestamp' | 'name';
  direction: 'asc' | 'desc';
}

export type FilterType = 'all' | 'finished' | 'notFinished';
