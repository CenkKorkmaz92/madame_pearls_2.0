import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing user's favorite jewelry images.
 * Allows users to save and manage their favorite product images
 * for later reference or when contacting about specific items.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
    /** Internal subject holding the array of favorite image URLs */
    private favoritesSubject = new BehaviorSubject<string[]>([]);
    
    /** Observable stream of favorite images that components can subscribe to */
    public favorites$: Observable<string[]> = this.favoritesSubject.asObservable();

    /**
     * Updates the list of favorite images.
     * Creates a shallow copy to ensure immutability.
     * @param favs - Array of favorite image URLs
     */
    public setFavorites(favs: string[]): void {
        this.favoritesSubject.next([...favs]);
    }

    /**
     * Clears all favorite images.
     */
    public clearFavorites(): void {
        this.favoritesSubject.next([]);
    }
}
