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
  AnimationTriggerMetadata,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css'],
  animations: [
    trigger('expansion', [
      state('hided', style({ display: 'none', height: '0', width: '0', opacity: '0', transform: 'translateX(85vw)' })),
      state('showed', style({ display: '*', height: '*', width: '*', opacity: '1' })),
      transition('* => showed', animate('225ms ease-out', keyframes([
        style({ display: '*', height: '*', width: '*', transform: 'translateX(85vw)', opacity: 0, offset: 0 }),
        style({ display: '*', height: '*', width: '*', transform: 'translateX(42.5vw)', opacity: 0.5, offset: 0.5 }),
        style({ display: '*', height: '*', width: '*', transform: 'translateX(0vw)', opacity: 1, offset: 1 })
      ]))),
      transition('* => hided', animate('225ms ease-out', keyframes([
        style({ display: '*', height: '*', width: '*', offset: 0, opacity: 1 }),
        style({ display: '*', height: '*', width: '*', transform: 'translateX(42.5vw)', offset: 0.5, opacity: 0.5 }),
        style({ display: 'none', height: '0', width: '0', transform: 'translateX(85vw)', offset: 1, opacity: 0 })
      ])))
    ]),
    trigger('applyBtnAppearance', [
      state('hided', style({ transform: 'translateX(0)' })),
      state('showed', style({ transform: 'translateX(-66px)' })),
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
