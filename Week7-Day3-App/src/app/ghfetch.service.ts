import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GhfetchService {

  private octokit = new Octokit({
    auth: environment.apikey
  })

  constructor() { }

  async getUserProfile(userID:any) {
    const response = await this.octokit.request('GET /users/{account_id}', {
      account_id: userID,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(response);
    if(response.status == 200) {
      
      let apiData = {
        login: response.data.login,
        name: response.data.name,
        avatar: response.data.avatar_url,
        ghprofileURL: response.data.html_url,
        creationDate: response.data.created_at,
        followers: response.data.followers,
        following: response.data.following,
        repos: response.data.repos_url,
        public_repo_amount: response.data.public_repos,
        orgs: response.data.organizations_url
      };
      
      return apiData;
    }
    else if (response.status == 401) {
      return 401;
    }
    else {
      return 404
    }
  }
}
