import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { movieReducer } from './store/movie.reducer';
import { MovieEffects } from './store/movie.effects';
import { MoviesComponent } from './pages/movies/movies.component';
import { TVSeriesComponent } from './pages/tv-series/tv-series.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { environment } from '../environments/environments';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { SharedLayoutComponent } from './shared-layout/shared-layout/shared-layout.component';
import { AuthLayoutComponent } from './shared-layout/auth-layout/auth-layout.component';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    MoviesComponent,
    TVSeriesComponent,
    BookmarksComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    SharedLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,

    StoreModule.forRoot({ movies: movieReducer }),
    EffectsModule.forRoot([MovieEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
