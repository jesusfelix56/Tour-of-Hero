import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../../services/hero.service';
import { MessageService } from '../../../../services/message.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})

export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  private _searchSub!: Subscription;

  constructor(
    private _heroService: HeroService,
    private _messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this._watchSearch();
  }

  ngOnDestroy(): void {
    this._searchSub.unsubscribe();
  }

  onSelect(hero: Hero): void {
    this._messageService.add(`HeroesComponent: Selected hero id= ${hero.id}`);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this._heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this._heroService.deleteHero(hero.id).subscribe();
  }
  
  private _watchSearch(): void {
    this._searchSub = this._heroService.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          term.trim()? this._heroService.searchHeroes(term): this._heroService.getHeroes(),
        ),
      )
      .subscribe((heroes) => (this.heroes = heroes));
  }

}
