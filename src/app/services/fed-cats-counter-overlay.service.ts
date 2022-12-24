import { Injectable, ElementRef, Injector, StaticProvider } from '@angular/core';
import { Overlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { FedCatsCounterComponent } from '../components/fed-cats-counter/fed-cats-counter.component';
import { FedCatsCounterOverlayRef } from './fed-cats-counter-overlay-ref';
import { FED_CATS_COUNT } from '../utils/injection-tokens';

@Injectable({
  providedIn: 'root',
})
export class FedCatsCounterOverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(elemRef: ElementRef, fedCatsCount?: number): FedCatsCounterOverlayRef {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(elemRef)
        .withPositions([
          new ConnectionPositionPair(
            { originX: 'center', originY: 'center' },
            { overlayX: 'center', overlayY: 'center' }
          ),
        ])
        .withPush(true),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: 'black-back',
    });

    const dialogRef = new FedCatsCounterOverlayRef(overlayRef);

    const portalInjector = this.createInjector(fedCatsCount, dialogRef);
    const catsCounterPortal = new ComponentPortal(FedCatsCounterComponent, null, portalInjector);

    overlayRef.attach(catsCounterPortal);

    overlayRef.backdropClick().subscribe((_) => overlayRef.dispose());

    return dialogRef;
  }

  private createInjector(fedCatsCount: number | undefined, dialogRef: FedCatsCounterOverlayRef): Injector {
    const injectionTokens: StaticProvider[] = [
      {
        provide: FED_CATS_COUNT,
        useValue: fedCatsCount,
      },
      {
        provide: FedCatsCounterOverlayRef,
        useValue: dialogRef,
      },
    ];

    return Injector.create({
      providers: injectionTokens,
      parent: this.injector,
    });
  }
}
