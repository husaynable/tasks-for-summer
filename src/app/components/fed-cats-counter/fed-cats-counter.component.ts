import { Component, OnInit, Inject } from '@angular/core';
import { FedCatsCounterOverlayRef } from 'src/app/services/fed-cats-counter-overlay-ref';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { FED_CATS_COUNT } from 'src/app/utils/injection-tokens';

@Component({
  selector: 'app-fed-cats-counter',
  templateUrl: './fed-cats-counter.component.html',
  styleUrls: ['./fed-cats-counter.component.css'],
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
export class FedCatsCounterComponent implements OnInit {
  public catsCount: number = 0;

  constructor(private dialogRef: FedCatsCounterOverlayRef, @Inject(FED_CATS_COUNT) private fedCatsCount: number) {}

  ngOnInit() {
    this.catsCount = this.fedCatsCount;
  }

  save() {
    this.dialogRef.close(this.catsCount);
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    if (this.catsCount <= 100) {
      this.catsCount += 1;
    }
  }

  subtract() {
    if (this.catsCount > 0) {
      this.catsCount -= 1;
    }
  }
}
