import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLegalService, LegalModalType } from '../modal-legal.service';
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

/**
 * Legal modal component - displays Terms of Service and Privacy Policy modals.
 * Subscribes to modal state changes and manages modal visibility.
 */
@Component({
  selector: 'app-legal-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-modal.component.html',
  styleUrl: './legal-modal.component.scss'
})
export class LegalModalComponent implements OnInit, OnDestroy {
  /** Tracks if modal is currently open */
  public isOpen = false;
  
  /** Current modal type being displayed */
  public currentModal: LegalModalType = null;
  
  /** Subscription to modal state changes */
  private subscription?: Subscription;

  constructor(
    public modalService: ModalLegalService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.modalService.modalState$.subscribe(state => {
      this.currentModal = state;
      this.isOpen = state !== null;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Closes the currently open legal modal.
   */
  public close(): void {
    this.modalService.close();
  }

  /**
   * Handles backdrop click events - closes modal if clicking outside content.
   * @param event - Mouse click event
   */
  public onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
