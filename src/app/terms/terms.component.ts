import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  constructor(public translationService: TranslationService) {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
