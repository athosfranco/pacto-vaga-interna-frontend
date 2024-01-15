import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  getCurrentYear() {
    const year = new Date().getFullYear();
    return year;
  }
}
