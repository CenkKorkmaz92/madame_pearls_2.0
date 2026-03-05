import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/** Type definition for legal modal types */
export type LegalModalType = 'terms' | 'privacy' | null;

/**
 * Service for managing legal modals (Terms of Service and Privacy Policy).
 * Handles opening, closing, and tracking the current legal modal state.
 * Also manages body overflow to prevent background scrolling when modal is open.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalLegalService {
  /** Internal subject holding the current modal type */
  private modalStateSubject = new BehaviorSubject<LegalModalType>(null);
  
  /** Observable stream of modal state that components can subscribe to */
  public modalState$: Observable<LegalModalType> = this.modalStateSubject.asObservable();

  /**
   * Opens the Terms of Service modal and prevents body scrolling.
   */
  public openTerms(): void {
    this.modalStateSubject.next('terms');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Opens the Privacy Policy modal and prevents body scrolling.
   */
  public openPrivacy(): void {
    this.modalStateSubject.next('privacy');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes any open legal modal and restores body scrolling.
   */
  public close(): void {
    this.modalStateSubject.next(null);
    document.body.style.overflow = 'auto';
  }

  /**
   * Checks if any legal modal is currently open.
   * @returns True if a modal is open, false otherwise
   */
  public get isOpen(): boolean {
    return this.modalStateSubject.value !== null;
  }

  /**
   * Gets the currently open modal type.
   * @returns The current modal type or null if no modal is open
   */
  public get currentModal(): LegalModalType {
    return this.modalStateSubject.value;
  }
}
