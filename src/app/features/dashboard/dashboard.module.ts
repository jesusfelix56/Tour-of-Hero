import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

@NgModule({
  imports: [CommonModule, FormsModule, DashboardRoutingModule],
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    MessagesComponent,
  ],
})
export class DashboardModule {}
