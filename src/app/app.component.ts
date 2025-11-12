import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { NavbarComponent } from './navbar/navbar.component';
import { CollectionComponent } from "./collection/collection.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from './contact/contact.component';
import { PartnersComponent } from "./partners/partners.component";
import { FooterComponent } from './footer/footer.component';
import { LegalModalComponent } from './legal-modal/legal-modal.component';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, NavbarComponent, CollectionComponent, AboutComponent, ContactComponent, FooterComponent, PartnersComponent, LegalModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Vanessa_Homepage';

  constructor(public translationService: TranslationService) {}
}
