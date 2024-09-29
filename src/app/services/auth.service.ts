// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Use AngularFireAuth
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {} // Inject AngularFireAuth

  // Sign up with email, password, and username
  register(
    email: string,
    password: string,
    username: string
  ): Observable<void> {
    const promise = this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        this.loggedIn = true;
        // Update user profile with username
        return response.user?.updateProfile({ displayName: username });
      })
      .then(() => {
        this.router.navigate(['/login']); // Navigate to login after registration
      })
      .catch((error) => {
        console.error('Error during sign-up:', error);
        throw error;
      });

    return from(promise);
  }

  // Login with email and password
  login(email: string, password: string): Observable<void> {
    const promise = this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loggedIn = true;
        this.router.navigate(['/home']); // Navigate to home after login
      })
      .catch((error) => {
        console.error('Error during login:', error);
        throw error;
      });

    return from(promise);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  // Logout user
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.loggedIn = false;
      this.router.navigate(['/login']); // Navigate to login page after logout
    });
  }
}
