import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  filesArr: any[];
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
  startUpload(event: any, filesArr) {
    // the file object
    if (this.filesArr === [] || this.filesArr === undefined) {
      if (event.type === 'drop') {
        console.log(this.objToArr(event.dataTransfer.files));
        this.filesArr = this.objToArr(event.dataTransfer.files);
      } else {
        this.filesArr = this.objToArr(event.target.files);
      }
    } else {
      if (event.type === 'drop') {
        console.log(this.objToArr(event.dataTransfer.files));
        this.filesArr = this.filesArr.concat(this.objToArr(event.dataTransfer.files));
      } else {
        this.filesArr = this.filesArr.concat(this.objToArr(event.target.files));
      }
    }
    this.filesArr.forEach((file, index) => {
      this.readUrl(event, file, index);
    });

  }
  // determine if the upload task is active so that we can toggle between the paused and resumed states
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  readUrl(event: any, file: File, index) {
    const reader = new FileReader();
    reader.onload = function(e: any) {
      document.getElementById(`closeBtn${index}`).removeAttribute('hidden');
      document.getElementById(`thumbnail${index}`).removeAttribute('hidden');
      document.getElementById(`thumbnail${index}`).setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(file);
  }
  objToArr(filesObj) {
    return Object.keys(filesObj).map(function(i) {
      const file = filesObj[i];
      return file;
    });
  }
  filesUpload(filesArr) {
    this.filesArr.forEach((file, index) => {
      // client side validation for formats
      // if (file.type.split('/')[0] !== 'image') {
      //   console.log('unsupported file type...');
      //   return;
      // }

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
    });
  }
  removeFile(i) {
    document.getElementById(`file${i}`).closest('.media-body').remove();
    this.filesArr.splice(i, 1);
  }
}
