import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCountComponent } from './counter-count.component';

describe('CounterCountComponent', () => {
  let component: CounterCountComponent;
  let fixture: ComponentFixture<CounterCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterCountComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
