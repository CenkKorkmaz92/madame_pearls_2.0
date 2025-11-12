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

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  favoriteImages: string[] = [];

  @ViewChild('filePreviewContainer') filePreviewContainer!: ElementRef;

  // Für die Vorschau (Modal)
  previewImage: string | null = null;
  previewImageIndex: number | null = null;

  constructor(
    private favoritesService: FavoritesService,
    public translationService: TranslationService
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

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    // Hier werden nur die URLs der Favoriten mitgeschickt!
    console.log('Submitting form:', {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
      favoriteImages: this.favoriteImages
    });

    alert('Thank you for your message!');

    form.resetForm();
    this.favoritesService.clearFavorites();
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
