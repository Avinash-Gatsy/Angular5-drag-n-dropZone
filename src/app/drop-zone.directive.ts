import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  @Output() dropped = new EventEmitter<FileList>(); // when the user drops multiple files we have a custom event emitter with the fileList
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  // listen to the drop event from the browser
  @HostListener('drop', ['$event'])
  onDrop($event) {
    // prevent the default behavior else the browser will open a new tab
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }


}
