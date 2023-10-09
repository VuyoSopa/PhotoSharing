import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { AuthServiceService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  posts: any;

  loggedInUser =
    this._authService.getUsername();

  constructor(
    private service: BackendApiService,
    private _authService: AuthServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getallPosts();
    this.isLoggedInUser()
  }

  isLoggedInUser() {
    if (!this.loggedInUser) {
      this._router.navigate(['/', 'login']);
    }
  }

  getallPosts(): void {
    this.service.getallPosts().subscribe({
      next: (res) => {
        this.posts = res;
        console.log(this.posts);
      },
    });
  }
}
