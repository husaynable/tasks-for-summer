import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderByComponent } from './order-by.component';

describe('OrderByComponent', () => {
  let component: OrderByComponent;
  let fixture: ComponentFixture<OrderByComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderByComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
