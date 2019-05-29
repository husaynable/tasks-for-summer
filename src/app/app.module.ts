import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { NameGetterComponent } from './components/name-getter/name-getter.component';

const notifierConfig: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  }
};

@NgModule({
  declarations: [AppComponent, LoginComponent, ItemsListComponent, NameGetterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./modules/tasks.module').then(m => m.TasksModule),
        canActivate: [LoginGuard]
      },
      { path: 'login', component: LoginComponent }
    ]),
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NotifierModule.withConfig(notifierConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ItemsListComponent, NameGetterComponent]
})
export class AppModule {}
