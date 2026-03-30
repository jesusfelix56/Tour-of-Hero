import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../../services/hero.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  heroesToShow: Hero[] = [];

  private _searchSub!: Subscription;
  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
    this._watchSearch();
  }

  ngOnDestroy(): void {
    this._searchSub.unsubscribe();
  }

  private _watchSearch(): void {
    this._searchSub = this._heroService.searchTerm$.pipe(debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        term.trim() ? this._heroService.searchHeroes(term) : this._heroService.getHeroes(),
      ),
    )
      .subscribe((heroes: Hero[]) => (this.heroesToShow = heroes));
  }
}
