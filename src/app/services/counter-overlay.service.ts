import { ElementRef, Injectable, Injector, StaticProvider } from '@angular/core';
import { ConnectionPositionPair, Overlay } from '@angular/cdk/overlay';
import { CounterOverlayRef } from './counter-overlay-ref';
import { ComponentPortal } from '@angular/cdk/portal';
import { COUNTER_COUNT } from '../utils/injection-tokens';
import { CounterCountComponent } from './../components/counter-count/counter-count.component';

@Injectable({ providedIn: 'root' })
export class CounterOverlayService {
  constructor(private overlay: Overlay) {}

  open(elemRef: ElementRef, counterCount: number) {
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
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: 'black-back'
    });

    const dialogRef = new CounterOverlayRef(overlayRef);
    const counterPortal = new ComponentPortal(
      CounterCountComponent,
      null,
      this.createInjector(counterCount, dialogRef)
    );

    overlayRef.attach(counterPortal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
    return dialogRef;
  }

  private createInjector(count: number, dialogRef: CounterOverlayRef): Injector {
    const countProvider: StaticProvider = {
      provide: COUNTER_COUNT,
      useValue: count
    };
    const overlayRefProvider: StaticProvider = {
      provide: CounterOverlayRef,
      useValue: dialogRef
    };
    return Injector.create({ providers: [countProvider, overlayRefProvider] });
  }
}
