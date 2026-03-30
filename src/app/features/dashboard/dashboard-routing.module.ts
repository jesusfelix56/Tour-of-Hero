import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'heroes', component: HeroesComponent },
      { path: 'detail/:id', component: HeroDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class DashboardRoutingModule {}