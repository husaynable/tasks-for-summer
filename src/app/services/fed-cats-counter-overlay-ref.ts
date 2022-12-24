import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class FedCatsCounterOverlayRef {
  public aftefClosed = new Subject<number | undefined>();

  constructor(private overlayRef: OverlayRef) {}

  close(fedCatsCount?: number): void {
    this.overlayRef.dispose();
    this.aftefClosed.next(fedCatsCount);
  }
}
