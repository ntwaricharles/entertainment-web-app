// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { TVSeriesComponent } from './pages/tv-series/tv-series.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SharedLayoutComponent } from '../app/shared-layout/shared-layout/shared-layout.component'; // Shared Layout
import { AuthLayoutComponent } from '../app/shared-layout/auth-layout/auth-layout.component'; // Auth Layout

const routes: Routes = [
  // Auth Layout Routes
  {
    path: '',
    component: AuthLayoutComponent, // Use Auth Layout for Login and Signup
    children: [
      { path: 'login', component: LoginComponent }, // Default route to Login
      { path: 'signup', component: SignupComponent },
    ],
  },
  // Shared Layout Routes
  {
    path: '',
    component: SharedLayoutComponent, // Use Shared Layout for these routes
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'tv-series', component: TVSeriesComponent },
      { path: 'bookmarks', component: BookmarksComponent },
    ],
  },
  // Wildcard route for unknown paths
  { path: '**', redirectTo: '' }, // Redirect unknown routes to Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
