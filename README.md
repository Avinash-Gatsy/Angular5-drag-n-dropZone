# AngularDragNdropFiles

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

Currently you will be able to upload a single image file by dropping it in the drop Zone.
This is yet to be enhanced to handle multiple files and multiple file types.

If you want to upload the image file to Firebase

Configure the your firebase account details in src/environments/environment.ts by creating a project in firebase and choosing - Add firebase to web to get the config values : 

    apiKey: "<key>",
    authDomain: "<project-name>.firebaseapp.com",
    databaseURL: "https://<project-name>firebaseio.com",
    projectId: "<project-name>",
    storageBucket: "<project-name>.appspot.com",
    messagingSenderId: "<id>"

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Screenshot

<img width="1076" alt="screen shot 2018-05-12 at 8 56 22 am" src="https://user-images.githubusercontent.com/22128448/39953160-4d311334-55c3-11e8-8d3e-e7eb64055385.png">
