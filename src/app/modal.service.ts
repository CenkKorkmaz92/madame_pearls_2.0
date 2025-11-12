import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modalOpenSubject = new BehaviorSubject<boolean>(false);
    modalOpen$ = this.modalOpenSubject.asObservable();

    setModalOpen(open: boolean) {
        this.modalOpenSubject.next(open);
    }

    triggerCloseModal() {
        this.modalOpenSubject.next(false);
    }
}
