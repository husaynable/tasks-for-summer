import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TasksService } from 'src/app/services/tasks.service';
import { Observable } from 'rxjs';
import { Counts } from '../../models/counts.model';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent implements OnInit {
  @Output() changed = new EventEmitter<SortModel>();
  @Output() filterChanged = new EventEmitter<FilterType>();

  currentValue: 'timestamp' | 'name' = 'timestamp';
  currentDirection: 'asc' | 'desc' = 'desc';
  filter: FilterType = 'all';
  counts$: Observable<Counts>;

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
