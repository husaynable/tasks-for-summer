import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class CounterOverlayRef {
  public aftefClosed = new Subject<number | undefined>();

  constructor(private overlayRef: OverlayRef) {}

  close(counterCount?: number): void {
    this.overlayRef.dispose();
    this.aftefClosed.next(counterCount);
  }
}
