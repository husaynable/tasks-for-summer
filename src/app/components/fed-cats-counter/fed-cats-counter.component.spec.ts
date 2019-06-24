import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FedCatsCounterComponent } from './fed-cats-counter.component';

describe('FedCatsCounterComponent', () => {
  let component: FedCatsCounterComponent;
  let fixture: ComponentFixture<FedCatsCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FedCatsCounterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FedCatsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
