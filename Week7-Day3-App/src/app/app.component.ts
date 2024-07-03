import { Component } from '@angular/core';
import { GhfetchService } from './ghfetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Week7-Day3-App';
  userData:any;
  userRepos:any;
  userID:any;

  constructor(private ghfetch: GhfetchService) {}

  async getUserProfile() {
    const data = await this.ghfetch.getUserProfile(this.userID);
    if(data == 404) {
      console.log("Not Found.");
      this.userData = null;
    }
    else if(data == 401) {
      console.log("Auth Failed.")
      this.userData = null;
    }
    else {
      console.log("Ok.");
      this.userData = data;
    }

    await this.getUserRepos();
  }

  async getUserRepos() {
    const data = await this.ghfetch.getUserRepos(this.userID);
    if(data == 404) {
      console.log("Not Found.");
      this.userRepos = null;
    }
    else if(data == 401) {
      console.log("Auth Failed.")
      this.userRepos = null;
    }
    else {
      console.log("Ok.");
      this.userRepos = data;
    }
  }
}
