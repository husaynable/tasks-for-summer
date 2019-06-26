// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  collectionName: 'tasks',
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyC1yPC5_Q_0iHUlu5O3QCIlY2vD5BktvLM',
    authDomain: 'tasks-for-summer.firebaseapp.com',
    databaseURL: 'https://tasks-for-summer.firebaseio.com',
    projectId: 'tasks-for-summer',
    storageBucket: 'tasks-for-summer.appspot.com',
    messagingSenderId: '1039645191162'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
