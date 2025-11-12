import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { ModalLegalService } from '../modal-legal.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    public translationService: TranslationService,
    private modalLegalService: ModalLegalService
  ) {}

  scrollToHome(): void {
    const collectionElement = document.getElementById('home');
    if (collectionElement) {
      collectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openTerms(): void {
    console.log('Opening terms modal');
    this.modalLegalService.openTerms();
  }

  openPrivacy(): void {
    console.log('Opening privacy modal');
    this.modalLegalService.openPrivacy();
  }
}
