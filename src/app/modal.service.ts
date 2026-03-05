import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing modal open/close state across the application.
 * Uses BehaviorSubject to maintain and broadcast the current modal state.
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
    /** Internal subject holding the modal open state */
    private modalOpenSubject = new BehaviorSubject<boolean>(false);
    
    /** Observable stream of modal open state that components can subscribe to */
    public modalOpen$: Observable<boolean> = this.modalOpenSubject.asObservable();

    /**
     * Sets the modal open state.
     * @param open - Whether the modal should be open (true) or closed (false)
     */
    public setModalOpen(open: boolean): void {
        this.modalOpenSubject.next(open);
    }

    /**
     * Triggers the modal to close by setting the state to false.
     */
    public triggerCloseModal(): void {
        this.modalOpenSubject.next(false);
    }
}
