import { Injectable, ElementRef } from '@angular/core';
import { Overlay, ConnectionPositionPair, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FedCatsCounterComponent } from '../components/fed-cats-counter/fed-cats-counter.component';

@Injectable({
  providedIn: 'root'
})
export class FedCatsCounterOverlayService {
  constructor(private overlay: Overlay) {}

  open(elemRef: ElementRef): OverlayRef {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(elemRef)
        .withPositions([
          new ConnectionPositionPair(
            { originX: 'center', originY: 'center' },
            { overlayX: 'center', overlayY: 'center' }
          )
        ])
        .withPush(true),
      hasBackdrop: true,
      backdropClass: 'black-back'
    });

    const catsCounterPortal = new ComponentPortal(FedCatsCounterComponent);

    overlayRef.attach(catsCounterPortal);

    overlayRef.backdropClick().subscribe(_ => overlayRef.dispose());

    return overlayRef;
  }
}
