import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from '../components/tasks/tasks.component';

import { TaskItemComponent } from '../components/task-item/task-item.component';
import { TasksListComponent } from '../components/tasks-list/tasks-list.component';
import { TaskAdderComponent } from '../components/task-adder/task-adder.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { TasksCountComponent } from '../components/tasks-count/tasks-count.component';
import { PictureTakerComponent } from '../components/picture-taker/picture-taker.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskItemComponent,
    TasksListComponent,
    TaskAdderComponent,
    TasksCountComponent,
    PictureTakerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TasksComponent }]),
    MaterialModule
  ],
  entryComponents: [PictureTakerComponent]
})
export class TasksModule {}
