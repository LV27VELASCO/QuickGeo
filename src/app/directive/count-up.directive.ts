import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit {

  @Input('appCountUp') targetNumber = 0;
  @Input() duration = 2000;

  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
        // 👇 Evita ejecutar en el servidor
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }


    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          console.log("llego")
          this.hasAnimated = true;
          this.animateCount();
          observer.disconnect();
        }
      });
    });

    observer.observe(this.el.nativeElement);
  }

  private animateCount() {
    const start = 0;
    const end = this.targetNumber;
    const duration = this.duration;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (end - start) + start);

      this.el.nativeElement.innerText = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        this.el.nativeElement.innerText = end.toLocaleString();
      }
    };

    requestAnimationFrame(update);
  }

}
