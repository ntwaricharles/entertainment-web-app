import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  register(
    email: string,
    password: string,
    username: string
  ): Observable<void> {
    const promise = this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        this.loggedIn = true;
        return response.user?.updateProfile({ displayName: username });
      })
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error during sign-up:', error);
        throw error;
      });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loggedIn = true;
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error during login:', error);
        throw error;
      });

    return from(promise);
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    });
  }
}
