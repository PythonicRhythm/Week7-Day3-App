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
    });

    console.log(response);
    if(response.status == 200) {
      
      let apiData = {
        login: response.data.login,
        name: response.data.name,
        avatar: response.data.avatar_url,
        ghprofileURL: response.data.html_url,
        creationDate: response.data.created_at.split("T")[0],
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

  async getUserRepos(userID:any) {
    const response = await this.octokit.request('GET /users/{account_id}/repos', {
      account_id: userID,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    console.log(response);
    if(response.status == 200) {

      let repoList: { 
        name: any;
        description: any;
        language: any;
        fork: any;
        repoURL: any; 
        creationDate: any; 
        updatedDate: any;
        contributors: any;
      } [] = [];

      response.data.forEach((element:any) => {
        let apiData = {
          name: element.name,
          description: element.description,
          language: element.language,
          fork: element.fork,
          repoURL: element.html_url,
          creationDate: element.created_at.split("T")[0],
          updatedDate: element.updated_at.split("T")[0],
          contributors: ""
        };
        
        repoList.push(apiData);
      });
      
      return repoList;
    }
    else if (response.status == 401) {
      return 401;
    }
    else {
      return 404
    }
  }

  async getContributors(userID:any, projName:any) {
    const response = await this.octokit.request('GET /repos/{account_id}/{project_name}/contributors', {
      account_id: userID,
      project_name: projName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    // console.log(response.status);
    if(response.status == 200) {
      let contributors: any[] = [];
      response.data.forEach((element:any) => {
        contributors.push(element.avatar_url);
      });
      return contributors;
    }
    else {
      return [];
    }
  }
}
