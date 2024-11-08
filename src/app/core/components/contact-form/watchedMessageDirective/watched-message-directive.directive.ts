import { Directive, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appWatchedMessageDirective]',
  standalone: true
})
export class WatchedMessageDirectiveDirective implements OnInit, OnDestroy {

  @Output() messageWatched = new EventEmitter<void>();

  private observerForMessage!: IntersectionObserver;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    this.observerForMessage = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.messageWatched.emit();
        this.observerForMessage.disconnect();
      }
    });

    this.observerForMessage.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observerForMessage) {
      this.observerForMessage.disconnect();
    }
  }
}
