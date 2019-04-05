import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCountComponent } from './tasks-count.component';

describe('TasksCountComponent', () => {
  let component: TasksCountComponent;
  let fixture: ComponentFixture<TasksCountComponent>;

  beforeEach(async(() => {
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
