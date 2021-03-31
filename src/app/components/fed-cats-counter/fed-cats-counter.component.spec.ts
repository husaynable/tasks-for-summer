import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FedCatsCounterComponent } from './fed-cats-counter.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FedCatsCounterOverlayRef } from 'src/app/services/fed-cats-counter-overlay-ref';
import { FED_CATS_COUNT } from 'src/app/utils/injection-tokens';
import { MaterialModule } from 'src/app/material.module';

fdescribe('FedCatsCounterComponent', () => {
  let spectrator: Spectator<FedCatsCounterComponent>;
  const createComponent = createComponentFactory({
    component: FedCatsCounterComponent,
    detectChanges: false,
    mocks: [FedCatsCounterOverlayRef],
    providers: [{ provide: FED_CATS_COUNT, useValue: 3 }],
    imports: [MaterialModule]
  });

  beforeEach(() => (spectrator = createComponent()));

  it('should show injected value', () => {
    spectrator.detectChanges();

    expect(spectrator.query('button').textContent.trim()).toBe('3');
  });
});
