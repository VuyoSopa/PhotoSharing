import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({

    image: new FormControl(''),
    caption: new FormControl(''),
    user: new FormControl(this._authService.getUsername()),
  });


  posts: any;
  constructor(
    private backEnd: BackendApiService,
    private dialog: MatDialogRef<AddProfileComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private _authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.reloadCurrentRoute()
  }

  file: any;


  files(event: any) {
    this.file = event.target.files[0];
  }

  SelectedImage(): void {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!this.file) {
      alert('Upload an image!');
    } else if (this.file && !allowedTypes.includes(this.file.type)) {
      alert('Upload images only');
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  post() {

    let formData = new FormData();

    formData.append('image', this.userForm.value.image);
    formData.append('caption', this.userForm.value.caption);
    formData.append('user', this.userForm.value.user);
    formData.append('file', this.file);

  

    this.SelectedImage();
    
    this.backEnd.uploadPost(formData).subscribe({
      next: (res) => {
        window.location.reload();
        this.dialog.close(true);
      },
    });
  }
}
