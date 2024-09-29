import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { TVSeriesComponent } from './pages/tv-series/tv-series.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SharedLayoutComponent } from '../app/shared-layout/shared-layout/shared-layout.component';
import { AuthLayoutComponent } from '../app/shared-layout/auth-layout/auth-layout.component'; 

const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: '',
    component: SharedLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'tv-series', component: TVSeriesComponent },
      { path: 'bookmarks', component: BookmarksComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
