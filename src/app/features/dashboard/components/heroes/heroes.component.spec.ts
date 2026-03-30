/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../../../../services/hero.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [
        {
          provide: HeroService,
          useValue: {
            searchTerm$: of(''),
            searchHeroes: () => of([]),
            getHeroes: () => of([]),
            addHero: () => of({ id: 1, name: 'test' }),
            deleteHero: () => of({}),
          },
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
