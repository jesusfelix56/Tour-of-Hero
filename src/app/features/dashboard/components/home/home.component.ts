import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../../services/hero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];

  private _heroSub!: Subscription;
  constructor(private _heroService: HeroService) {}
 
  ngOnInit(): void {
    this._getHeroes();
  }

   ngOnDestroy(): void {
    this._heroSub.unsubscribe();
  }

  private _getHeroes(): void {
   this._heroSub =  this._heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
