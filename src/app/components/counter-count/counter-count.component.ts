import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { CounterOverlayRef } from '../../services/counter-overlay-ref';
import { COUNTER_COUNT } from '../../utils/injection-tokens';

@Component({
  templateUrl: './counter-count.component.html',
  styleUrls: ['./counter-count.component.css'],
  animations: [
    trigger('saveState', [
      state('ready', style({ transform: 'translateX(20px)' })),
      transition('* => ready', animate('325ms cubic-bezier(0, 0, 0.2, 1)')),
    ]),
    trigger('cancelState', [
      state('ready', style({ transform: 'translateX(-20px)' })),
      transition('* => ready', animate('325ms cubic-bezier(0, 0, 0.2, 1)')),
    ]),
    trigger('addState', [
      state('ready', style({ transform: 'translateY(-20px)' })),
      transition('* => ready', animate('325ms cubic-bezier(0, 0, 0.2, 1)')),
    ]),
    trigger('subtractState', [
      state('ready', style({ transform: 'translateY(20px)' })),
      transition('* => ready', animate('325ms cubic-bezier(0, 0, 0.2, 1)')),
    ]),
  ],
})
export class CounterCountComponent {
  constructor(private dialogRef: CounterOverlayRef, @Inject(COUNTER_COUNT) public counterCount: number) {}

  save() {
    this.dialogRef.close(this.counterCount);
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    this.counterCount += 1;
  }

  subtract() {
    this.counterCount -= 1;
  }
}
