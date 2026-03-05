import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../translation.service';

/**
 * Hero section component - displays the main landing banner.
 * Provides navigation buttons to scroll to collection and about sections.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  
  constructor(public translationService: TranslationService) {}
  
  /**
   * Smoothly scrolls the viewport to the collection section.
   */
  public scrollToCollection(): void {
    const collectionElement = document.getElementById('collection');
    if (collectionElement) {
      collectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Smoothly scrolls the viewport to the about section.
   */
  public scrollToAbout(): void {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
