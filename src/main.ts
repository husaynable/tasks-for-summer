import { EnvironmentProviders, enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Route, provideRouter } from '@angular/router';
import { loginGuard } from './app/guards/login.guard';
import { LoginComponent } from './app/components/login/login.component';
import { CreateUserComponent } from './app/components/create-user/create-user.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

if (environment.production) {
  enableProdMode();
}

const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./app/components/tasks/tasks.component').then((m) => m.TasksComponent),
    canActivate: [loginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
];

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage()),
]);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    importProvidersFrom([
      BrowserAnimationsModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ]),
  ],
});
