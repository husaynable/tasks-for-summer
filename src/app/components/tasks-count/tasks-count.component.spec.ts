import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TasksCountComponent } from './tasks-count.component';

describe('TasksCountComponent', () => {
  let component: TasksCountComponent;
  let fixture: ComponentFixture<TasksCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
