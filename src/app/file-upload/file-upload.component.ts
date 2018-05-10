import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  // main task of uploading
  task: AngularFireUploadTask;

  // progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // download URL
  downloadURL: Observable<string>;

  // state for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  startUpload(event: any) {
    console.log(event);
    let file: File;
    // the file object
    if (event.type === 'drop') {
      file = event.dataTransfer.files.item(0);
    } else {
      file = event.target.files.item(0);
    }

    // client side validation for formats
    if (file.type.split('/')[0] !== 'image') {
      console.log('unsupported file type...');
      return;
    }

    // the storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // optional metadata
    const customMetadata = { app: 'Angular Drag n Drop FileUpload'};

    // main task to upload
    this.task = this.storage.upload(path, file, { customMetadata });

    // progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // download URL
    this.downloadURL = this.task.downloadURL();
  }
  // determine if the upload task is active so that we can toggle between the paused and resumed states
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  readUrl(event: any, file: File) {
    const reader = new FileReader();
    reader.onload = function(e: any) {
      document.getElementById('thumbnail').removeAttribute('hidden');
      document.getElementById('thumbnail').setAttribute('src', e.target.result);
      // console.log(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}
