import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private favoritesSubject = new BehaviorSubject<string[]>([]);
    favorites$ = this.favoritesSubject.asObservable();

    setFavorites(favs: string[]) {
        this.favoritesSubject.next([...favs]);
    }

    clearFavorites() {
        this.favoritesSubject.next([]);
    }
}
