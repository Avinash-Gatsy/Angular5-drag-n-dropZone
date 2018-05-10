// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    // Add your firebase config here.
    apiKey: 'AIzaSyAet81GzCmcml4QZpT6qaIY_OQhjMFSBCk',
    authDomain: 'angular-fileupload.firebaseapp.com',
    databaseURL: 'https://angular-fileupload.firebaseio.com',
    projectId: 'angular-fileupload',
    storageBucket: 'angular-fileupload.appspot.com',
    messagingSenderId: '769626972540'
  }
};
