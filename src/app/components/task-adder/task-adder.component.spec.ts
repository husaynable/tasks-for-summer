import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskAdderComponent } from './task-adder.component';

describe('TaskAdderComponent', () => {
  let component: TaskAdderComponent;
  let fixture: ComponentFixture<TaskAdderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
