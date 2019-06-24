import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class FedCatsCounterOverlayService {
  constructor(private overlay: Overlay) {}

  open() {
    const overlayRef = this.overlay.create();
  }
}
