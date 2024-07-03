import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';

@Injectable({
  providedIn: 'root'
})
export class GhfetchService {

  private octokit = new Octokit({
    auth: ''
  })

  constructor() { }

  async getUserProfile() {
    const response = await this.octokit.request('GET /users/{account_id}', {
      account_id: 'asdfasdfasldhflasjdhflajsdhfljasdh',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(response);
    if(response.status == 200) {
      return response.data;
    }
    else if (response.status == 401) {
      return 401;
    }
    else {
      return 404
    }
  }
}
