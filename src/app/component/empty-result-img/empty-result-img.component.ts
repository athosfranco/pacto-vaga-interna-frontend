import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-result-img',
  templateUrl: './empty-result-img.component.html',
  styleUrl: './empty-result-img.component.css',
})
export class EmptyResultImgComponent {
  @Input() message: any;
}
