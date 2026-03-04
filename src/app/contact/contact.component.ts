import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites.service';
import { TranslationService } from '../translation.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  favoriteImages: string[] = [];
  isSubmitting = false;

  @ViewChild('filePreviewContainer') filePreviewContainer!: ElementRef;

  // Für die Vorschau (Modal)
  previewImage: string | null = null;
  previewImageIndex: number | null = null;

  constructor(
    private favoritesService: FavoritesService,
    public translationService: TranslationService,
    private emailService: EmailService
  ) {
    this.favoritesService.favorites$.subscribe(favs => {
      this.favoriteImages = favs;
    });
  }

  ngAfterViewInit(): void {
    const el = this.filePreviewContainer?.nativeElement;
    if (el) {
      el.addEventListener(
        'wheel',
        (event: WheelEvent) => {
          const atTop = el.scrollTop === 0;
          const atBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
          const scrollingDown = event.deltaY > 0;
          const scrollingUp = event.deltaY < 0;

          if ((atBottom && scrollingDown) || (atTop && scrollingUp)) {
            event.preventDefault();
          }
        },
        { passive: false }
      );
    }
  }

  scrollToPartners(): void {
    const footer = document.getElementById('partners');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  removeFavoriteImage(index: number) {
    this.favoriteImages.splice(index, 1);
    this.favoritesService.setFavorites(this.favoriteImages);
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;

    try {
      await this.emailService.sendContactEmail(
        form.value.name,
        form.value.email,
        form.value.message,
        this.favoriteImages
      );

      // Success message in current language
      const successMessage = this.translationService.getCurrentLang() === 'de'
        ? 'Vielen Dank für Ihre Nachricht! Ich melde mich bald bei Ihnen.'
        : 'Thank you for your message! I will get back to you soon.';
      
      alert(successMessage);

      form.resetForm();
      this.favoritesService.clearFavorites();
    } catch (error) {
      console.error('Email sending failed:', error);
      
      const errorMessage = this.translationService.getCurrentLang() === 'de'
        ? 'Entschuldigung, beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
        : 'Sorry, there was an error sending your message. Please try again later.';
      
      alert(errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }

  // --------- Modal Vorschau für Favoriten -----------
  openPreview(img: string, index: number): void {
    this.previewImage = img;
    this.previewImageIndex = index;
    document.body.style.overflow = 'hidden'; // Scrolling verhindern
    window.addEventListener('keydown', this.handlePreviewKeydown);
  }

  closePreview(): void {
    this.previewImage = null;
    this.previewImageIndex = null;
    document.body.style.overflow = '';
    window.removeEventListener('keydown', this.handlePreviewKeydown);
  }

  handlePreviewKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closePreview();
    }
  };

  removePreviewImage() {
    if (this.previewImageIndex !== null) {
      this.removeFavoriteImage(this.previewImageIndex);
      this.closePreview();
    }
  }
}
