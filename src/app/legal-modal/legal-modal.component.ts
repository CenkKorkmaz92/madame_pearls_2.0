import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLegalService, LegalModalType } from '../modal-legal.service';
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-modal.component.html',
  styleUrl: './legal-modal.component.scss'
})
export class LegalModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  currentModal: LegalModalType = null;
  private subscription?: Subscription;

  constructor(
    public modalService: ModalLegalService,
    public translationService: TranslationService
  ) {
    console.log('LegalModalComponent constructor');
  }

  ngOnInit(): void {
    this.subscription = this.modalService.modalState$.subscribe(state => {
      console.log('Modal state changed:', state);
      this.currentModal = state;
      this.isOpen = state !== null;
      console.log('isOpen:', this.isOpen, 'currentModal:', this.currentModal);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  close(): void {
    this.modalService.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
