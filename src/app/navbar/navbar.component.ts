import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal.service';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  selectedLanguage = 'en';
  modalIsOpen = false;

  constructor(
    public modalService: ModalService,
    public translationService: TranslationService
  ) {
    this.modalService.modalOpen$.subscribe(open => {
      this.modalIsOpen = open;
    });
    this.translationService.setLanguage(this.selectedLanguage);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translationService.setLanguage(lang);
  }

  onNavClick(): void {
    this.isMenuOpen = false;
    this.modalService.triggerCloseModal();
  }

  onNavbarButtonClick(): void {
    this.modalService.triggerCloseModal();
  }

  scrollToHome(): void {
    const homeElement = document.getElementById('home');
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
