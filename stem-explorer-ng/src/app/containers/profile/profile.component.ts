import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Profile } from 'src/app/shared/models/profile';
import { ImageService } from 'src/app/shared/services/image.service';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/shared/models/region';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedIn: boolean;
  profile: Profile;
  profilePic: any;
  regions: Region[] = [];
  cities: string[] = [];

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    region: new FormControl('', Validators.required),
    homeTown: new FormControl('', Validators.required),
    profilePic: new FormControl(''),
    nickname: new FormControl('', Validators.required)
  });

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private imageService: ImageService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.profilePic = this.auth._user.photo;
    this.setForm();
    this.fetchRegions();
  }

  fetchRegions() {
    this.http.get<Region[]>('/assets/regions.json').subscribe((regions) => {
      this.regions = regions;
      console.log(regions);
    });
  }

  toMap() {
    this.router.navigate(['/']);
  }

  get errorMessage(): boolean {
    return this.profileForm.dirty && !this.profileForm.valid;
  }

  private setForm() {
    this.profileForm.controls.firstName.setValue(this.profile.firstName);
    this.profileForm.controls.lastName.setValue(this.profile.lastName);
    this.profileForm.controls.email.setValue(this.profile.email);
    this.profileForm.controls.region.setValue(this.profile.region);
    this.profileForm.controls.homeTown.setValue(this.profile.homeTown);
    this.profileForm.controls.profilePic.setValue(this.profilePic);
    this.profileForm.controls.nickname.setValue(this.profile.nickname);
  }

  onSubmit(): void {
    const updatedUser: Profile = {
      id: this.profile.id,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      region: this.profileForm.get('region').value,
      homeTown: this.profileForm.get('homeTown').value,
      nickname: this.profileForm.get('nickname').value,
      profileCompleted: true,
      userId: this.profile.userId,
      email: this.profile.email,
    };

    this.auth.updateProfile(updatedUser, this.profilePic).subscribe(
      () => {
        this.profileForm.markAsPristine();
        this.snackbar.open('Awesome! Profile updated!', 'Close', {
          duration: 3000
        });
      }
    );
  }

  async selectFile(photo) {
    if (photo.target.files && photo.target.files[0]) {
      this.profileForm.controls.profilePic.markAsDirty();
      const file = photo.target.files[0];
      const url = await this.imageService.readAsDataURL(file);
      const unscaled = await this.imageService.loadImage(url);
      const cropped = this.imageService.cropToSquare(unscaled, 40);
      const croppedURL = cropped.toDataURL('image/webp');
      this.profilePic = croppedURL;
    }
  }
}
