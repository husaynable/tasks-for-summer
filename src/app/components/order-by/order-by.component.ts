import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent implements OnInit {
  @Output() changed = new EventEmitter<SortModel>();

  currentValue: 'timestamp' | 'name' = 'timestamp';
  currentDirection: 'asc' | 'desc' = 'desc';

  constructor() {}

  ngOnInit(): void {}

  onValChanged(e: MatButtonToggleChange) {
    this.changed.emit({ value: e.value, direction: this.currentDirection });
  }

  onDirChanged(e: MatButtonToggleChange) {
    this.changed.emit({ value: this.currentValue, direction: e.value });
  }
}

export interface SortModel {
  value: 'timestamp' | 'name';
  direction: 'asc' | 'desc';
}
