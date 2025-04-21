import { TranslateModule } from '@ngx-translate/core';
import { CountUpDirective } from '../../directive/count-up.directive';
import { AfterViewInit, Component, ElementRef, Inject,PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CountUpDirective,TranslateModule],
  templateUrl: './testimonial.component.html'
})
export class TestimonialComponent implements AfterViewInit {
  animation = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef;
  ngAfterViewInit(): void {
    // 👇 Evita ejecutar en el servidor
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animation) {
          console.log("llego");
          this.animation = true;
        }
      });
    });

    observer.observe(this.cardsContainer.nativeElement);
  }
}
