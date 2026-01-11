import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../favorites.service';
import { ModalService } from '../modal.service';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  isModalOpen = false;
  isImageZoomOpen = false;
  selectedCategory: any = {};
  selectedZoomImage = '';
  favoriteImages: string[] = [];

  readonly MAX_FAVORITES = 5;

  categories: Array<{
    label: string;
    imgSrc: string;
    images: string[];
    description: string;
  }> = [];

  constructor(
    private favoritesService: FavoritesService,
    private modalService: ModalService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.favoritesService.favorites$.subscribe((favs: string[]) => {
      this.favoriteImages = favs;
    });
    this.setCategoryLabels();
    this.translationService.languageChanged$.subscribe(() => {
      this.setCategoryLabels();
    });
  }

  setCategoryLabels(): void {
    this.categories = [
      {
        label: this.translationService.t('collection.men'),
        description: 'Handwoven bracelets featuring smooth volcanic stones in charcoal tones',
        imgSrc: 'assets/images/collection/men/men_6.webp',
        images: [
          'assets/images/collection/men/men_1.webp',
          'assets/images/collection/men/men_2.webp',
          'assets/images/collection/men/men_3.webp',
          'assets/images/collection/men/men_4.webp',
          'assets/images/collection/men/men_5.webp',
          'assets/images/collection/men/men_6.webp',
          'assets/images/collection/men/men_7.webp'
        ]
      },
      {
        label: this.translationService.t('collection.women'),
        description: 'Elegant necklaces with terracotta and gray volcanic stones',
        imgSrc: 'assets/images/collection/women/women_3.webp',
        images: [
          'assets/images/collection/women/women_1.webp',
          'assets/images/collection/women/women_2.webp',
          'assets/images/collection/women/women_3.webp',
          'assets/images/collection/women/women_4.webp',
          'assets/images/collection/women/women_5.webp',
          'assets/images/collection/women/women_6.webp',
          'assets/images/collection/women/women_7.webp',
          'assets/images/collection/women/women_8.webp',
          'assets/images/collection/women/women_9.webp',
          'assets/images/collection/women/women_10.webp',
          'assets/images/collection/women/women_11.webp',
          'assets/images/collection/women/women_12.webp',
          'assets/images/collection/women/women_13.webp',
          'assets/images/collection/women/women_14.webp',
          'assets/images/collection/women/women_15.webp',
          'assets/images/collection/women/women_16.webp',
          'assets/images/collection/women/women_17.webp'
        ]
      },
      {
        label: this.translationService.t('collection.necklace'),
        description: 'Sophisticated pieces combining volcanic stones with gold accents',
        imgSrc: 'assets/images/collection/necklace/necklace_1.webp',
        images: [
          'assets/images/collection/necklace/necklace_1.webp',
          'assets/images/collection/necklace/necklace_2.webp',
          'assets/images/collection/necklace/necklace_3.webp',
          'assets/images/collection/necklace/necklace_4.webp'
        ]
      },
      {
        label: this.translationService.t('collection.kids'),
        description: 'Delicate designs inspired by the Aegean Sea',
        imgSrc: 'assets/images/collection/kids/kids_1.webp',
        images: [
          'assets/images/collection/kids/kids_1.webp',
          'assets/images/collection/kids/kids_2.webp',
          'assets/images/collection/kids/kids_3.webp'
        ]
      }
    ];
  }

  scrollToAbout(): void {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openModal(category: any): void {
    this.selectedCategory = category;
    this.isModalOpen = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    this.modalService.setModalOpen(true);
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    this.modalService.setModalOpen(false);
  }

  nextCategory(event: Event): void {
    event.stopPropagation();
    const currentIndex = this.categories.indexOf(this.selectedCategory);
    this.selectedCategory = currentIndex < this.categories.length - 1
      ? this.categories[currentIndex + 1]
      : this.categories[0];
  }

  previousCategory(event: Event): void {
    event.stopPropagation();
    const currentIndex = this.categories.indexOf(this.selectedCategory);
    this.selectedCategory = currentIndex > 0
      ? this.categories[currentIndex - 1]
      : this.categories[this.categories.length - 1];
  }

  openImageZoom(imageUrl: string, event: Event): void {
    event.stopPropagation();
    this.selectedZoomImage = imageUrl;
    this.isImageZoomOpen = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  closeImageZoom(): void {
    this.isImageZoomOpen = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    const currentIndex = this.selectedCategory.images.indexOf(this.selectedZoomImage);
    this.selectedZoomImage = currentIndex < this.selectedCategory.images.length - 1
      ? this.selectedCategory.images[currentIndex + 1]
      : this.selectedCategory.images[0];
  }

  previousImage(event: Event): void {
    event.stopPropagation();
    const currentIndex = this.selectedCategory.images.indexOf(this.selectedZoomImage);
    this.selectedZoomImage = currentIndex > 0
      ? this.selectedCategory.images[currentIndex - 1]
      : this.selectedCategory.images[this.selectedCategory.images.length - 1];
  }

  toggleFavorite(imgUrl: string, event: Event): void {
    event.stopPropagation();
    const idx = this.favoriteImages.indexOf(imgUrl);

    if (idx > -1) {
      this.favoriteImages.splice(idx, 1);
    } else {
      if (this.favoriteImages.length >= this.MAX_FAVORITES) {
        alert(`You can select a maximum of ${this.MAX_FAVORITES} favorites.`);
        return;
      }
      this.favoriteImages.push(imgUrl);
    }
    this.syncFavorites();
  }

  isFavorite(imgUrl: string): boolean {
    return this.favoriteImages.includes(imgUrl);
  }

  syncFavorites(): void {
    this.favoritesService.setFavorites(this.favoriteImages);
  }
}
