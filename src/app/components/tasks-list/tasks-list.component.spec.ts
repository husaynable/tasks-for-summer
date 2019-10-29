import { fakeAsync } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TasksListComponent } from './tasks-list.component';
import { TasksService } from 'src/app/services/tasks.service';
import { of } from 'rxjs';
import { TaskItemComponent } from '../task-item/task-item.component';
import { MaterialModule } from 'src/app/material.module';

fdescribe('TasksListComponent', () => {
  let spectator: Spectator<TasksListComponent>;
  const createComponent = createComponentFactory({
    component: TasksListComponent,
    detectChanges: false,
    mocks: [TasksService],
    imports: [MaterialModule],
    declarations: [TaskItemComponent]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create tasks list', fakeAsync(() => {
    const tasksServie = spectator.get(TasksService);
    tasksServie.getTasks.and.callFake(() => of([{ id: 1 }, { id: 2 }]));

    spectator.detectChanges();

    expect(spectator.queryAll('app-task-item').length).toBe(2);
  }));
});
