import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngxs/store';

import { auth } from 'firebase/app';
import 'firebase/auth';

import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { UpdateToken, UpdateUser } from 'src/app/store/current-user/current-user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private api: ApiService,
    private store: Store,
  ) {
    this.afAuth.authState.subscribe(async (state) => {
      const token = await state?.getIdToken();
      this.store.dispatch(new UpdateToken(token));

      if (!token) {
        this.store.dispatch(new UpdateUser(null));
        return;
      }

      let user = await this.api.getCurrentUser(token).toPromise();

      if (!user) {
        // TODO: prompt user for registration info
        const userInfo: User = {
          // id will be ignored
          id: null,
          name: state.displayName,
        };

        user = await this.api.registerUser(token, userInfo).toPromise();
      }

      this.store.dispatch(new UpdateUser(user));

      console.log('User logged in with backend!', user);
    });
  }

  // google signin
  googleAuthLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: auth.AuthProvider) {
    try {
      const res = await this.afAuth.signInWithPopup(provider);
      console.log('You have been succesfully logged in! woohoo', res);
    } catch (error) {
      console.warn(error);
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }
}
