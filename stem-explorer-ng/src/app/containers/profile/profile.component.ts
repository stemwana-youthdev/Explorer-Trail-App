import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  loggedIn: boolean;

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    region: new FormControl('', Validators.required),
    homeTown: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    await this.auth.getCurrentUser().then(value =>
      this.user = value
    );
    this.profileForm.get('firstName').setValue(this.user.firstName);
    this.profileForm.get('lastName').setValue(this.user.lastName);
    this.profileForm.get('region').setValue(this.user.region);
    this.profileForm.get('homeTown').setValue(this.user.homeTown);

    const email = await this.auth.currentUserEmail();
    this.profileForm.get('email').setValue(email);
  }

  async onSubmit() {
    const updatedUser = {
      id: this.user.id,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      region: this.profileForm.get('region').value,
      homeTown: this.profileForm.get('homeTown').value
    };
    try {
      await this.auth.updateCurrentUser(updatedUser);
    }catch (error) {
      console.warn(error);
      return;
    }
    this.snackbar.open('Profile successfully updated', 'Close', {
      duration: 3000
    });
  }

}