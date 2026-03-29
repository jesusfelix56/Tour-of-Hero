import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValueOf, of, tap } from 'rxjs';
import { Hero } from '../shared/interfaces/hero.interface';
import { HEROES } from '../core/api/mocks/mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  //se usa en operaciones HTTP de escritura
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  //obtiene los heroes desde el servidor
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])),
    );
  }

  //obtine un heroe por su id
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id= ${id}`)),
    );
  }

  //Actualisa un heroe en el servidor
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
    );
  }

  //añade un nuevo heroe al servidor
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id={newHero.id}`)),
      catchError(this.handleError<Hero>('addHero')),
    );
  }

  //elimina un heroe del servidor
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero')),
    );
  }

  //obtiene los heroes cuyo nombre contiene el término de búsqueda 
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    //realisa una solicitud http GET a la Url de los heroes con el término de búsqueda
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "$term"`),
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }

  //registra en el servidor de mensajes
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  //maneja el error en una operacion HTTP
  private handleError<T>(operation = 'operation', results?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(results as T);
    };
  }
}
