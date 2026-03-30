import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../../shared/interfaces/hero.interface';
import { HeroService } from '../../../../services/hero.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})

export class HeroDetailComponent implements OnInit, OnDestroy {
  hero?: Hero;
  private _heroSub!: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _heroService: HeroService,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this._getHero();
  }

  ngOnDestroy(): void {
    this._heroSub.unsubscribe();
  }
  
  private _getHero(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this._heroSub = this._heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this._location.back();
  }

  save(): void {
    if (this.hero) {
      this._heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
