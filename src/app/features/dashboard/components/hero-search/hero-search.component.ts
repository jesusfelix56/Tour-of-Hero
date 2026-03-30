import { Component } from '@angular/core';
import { HeroService } from '../../../../services/hero.service';

@Component({
  selector: 'app-nav-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent {
  constructor(private _heroService: HeroService) {}

  search(term: string): void {
    this._heroService.setSearchTerm(term);
  }
}
