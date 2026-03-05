import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { ModalLegalService } from '../modal-legal.service';

/**
 * Footer component - displays site footer with legal links and social media icons.
 * Provides access to Terms of Service and Privacy Policy modals.
 */
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

  /**
   * Smoothly scrolls the viewport to the top of the page (home section).
   */
  public scrollToHome(): void {
    const collectionElement = document.getElementById('home');
    if (collectionElement) {
      collectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Opens the Terms of Service modal.
   */
  public openTerms(): void {
    this.modalLegalService.openTerms();
  }

  /**
   * Opens the Privacy Policy modal.
   */
  public openPrivacy(): void {
    this.modalLegalService.openPrivacy();
  }
}
