import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LegalModalType = 'terms' | 'privacy' | null;

@Injectable({
  providedIn: 'root'
})
export class ModalLegalService {
  private modalStateSubject = new BehaviorSubject<LegalModalType>(null);
  public modalState$ = this.modalStateSubject.asObservable();

  openTerms(): void {
    this.modalStateSubject.next('terms');
    document.body.style.overflow = 'hidden';
  }

  openPrivacy(): void {
    this.modalStateSubject.next('privacy');
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.modalStateSubject.next(null);
    document.body.style.overflow = 'auto';
  }

  get isOpen(): boolean {
    return this.modalStateSubject.value !== null;
  }

  get currentModal(): LegalModalType {
    return this.modalStateSubject.value;
  }
}
