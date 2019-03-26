import { Component, OnInit } from '@angular/core';
import {
  animate,
  animateChild,
  group,
  state,
  style,
  transition,
  trigger,
  query,
  AnimationTriggerMetadata
} from '@angular/animations';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css'],
  animations: [
    trigger('expansion', [
      state('void, hided', style({opacity: 0, transform: 'scale(0.7)'})),
      state('showed', style({transform: 'none'})),
      transition('* => showed', animate('150ms cubic-bezier(0, 0, 0.2, 1)',
          style({transform: 'none', opacity: 1}))),
      transition('* => void, * => hided',
          animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0})))
    ]),
    trigger('applyBtnAppearance', [
      state('hided', style({ transform: 'translateX(0)' })),
      state('showed', style({ transform: 'translateX(66px)' })),
      transition('hided <=> showed', animate('225ms ease-out'))
    ])
  ]
})
export class TaskAdderComponent implements OnInit {
  expansionState: 'hided' | 'showed' = 'hided';
  constructor() {}

  ngOnInit() {}

  toggle() {
    if (this.expansionState === 'hided') {
      this.expansionState = 'showed';
    } else {
      this.expansionState = 'hided';
    }
  }
}
