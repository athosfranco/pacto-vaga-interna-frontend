import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent {
  showScrollButton: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.renderer.listen('window', 'scroll', () => {
      this.showScrollButton = window.scrollY > 100;
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
