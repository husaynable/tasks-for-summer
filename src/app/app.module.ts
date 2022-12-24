import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { NameGetterComponent } from './components/name-getter/name-getter.component';
import { FedCatsCounterComponent } from './components/fed-cats-counter/fed-cats-counter.component';
import { EqualDirective } from './directives/validate-equal.directive';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ItemsListComponent,
    NameGetterComponent,
    FedCatsCounterComponent,
    EqualDirective,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./modules/tasks.module').then((m) => m.TasksModule),
        canActivate: [LoginGuard],
      },
      { path: 'login', component: LoginComponent },
      { path: 'create-user', component: CreateUserComponent },
    ]),
    FormsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
