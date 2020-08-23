import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { auth } from 'firebase/app';

import { ApiService } from '../services/api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly isLoggedIn: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private api: ApiService,
  ) {
    this.isLoggedIn = this.afAuth.authState.pipe(
      map(state => {
        if (state)
          return true;
        else
          return false;
      })
    );
  }

  private async getToken() {
    const user = await this.afAuth.currentUser;
    const token = await user.getIdToken();
    return token;
  }

  // google signin
  googleAuthLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: auth.AuthProvider) {
    try {
      const res = await this.afAuth.signInWithPopup(provider);

      let user = await this.getCurrentUser();
      if (!user) {
        const userInfo: User = {
          // id will be ignored
          id: null,
          firstName: '',
          lastName: '',
          region: '',
          homeTown: '',
        };
        user = await this.registerUser(userInfo);
      }

      console.log('You have been succesfully logged in! woohoo', res, user);
    } catch (error) {
      console.warn(error);
    }
  }

  async emailRegister(
    email: string,
    password: string
  ) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('Successful register!', res);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

  // These methods return promises instead of Observables
  // so that we can await this.getToken()
  async getCurrentUser() {
    return await this.api.getCurrentUser(await this.getToken()).toPromise();
  }

  async registerUser(userInfo: User) {
    return await this.api.registerUser(await this.getToken(), userInfo).toPromise();
  }

  // userInfo needs to have all of its properties set,
  // or they will be set to null in the DB.
  // Usually this will be a copy of CurrentUser.user with
  // the properties you want to update
  async updateCurrentUser(userInfo: User) {
    return await this.api.updateUser(await this.getToken(), userInfo).toPromise();
  }

  async getProgress(challengeId: number) {
    return await this.api.getProgress(await this.getToken(), challengeId).toPromise();
  }

  async levelCompleted(levelId: number) {
    return await this.api.levelCompleted(await this.getToken(), levelId).toPromise();
  }
}
