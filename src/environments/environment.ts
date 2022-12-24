// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  collectionName: 'tasks',
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBFwMzefMVcYU9xv9FOFpwePePlRxcf2Gk',
    authDomain: 'tasks-for-summer-dev.firebaseapp.com',
    databaseURL: 'https://tasks-for-summer-dev.firebaseio.com',
    projectId: 'tasks-for-summer-dev',
    storageBucket: 'tasks-for-summer-dev.appspot.com',
    messagingSenderId: '273164399132',
    appId: '1:273164399132:web:8e82764f88823c258c25d9',
    measurementId: 'G-6Q9DEPF1M4'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
