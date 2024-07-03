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

  constructor(private ghfetch: GhfetchService) {}

  async getUserRepo() {
    const data = await this.ghfetch.getUserProfile();
    if(data == 404) {
      console.log("Not Found.");
      this.userData = "";
    }
    else if(data == 401) {
      console.log("Auth Failed.")
      this.userData = "";
    }
    else {
      console.log("Ok.");
      this.userData = data;
    }
  }
}
