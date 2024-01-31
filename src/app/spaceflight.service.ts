import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpaceflightService {
  readonly baseUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) {}

  getArticles(limit: number, offset: number = 0, searchTerm?: string) {
    return this.http.get(this.baseUrl, {
      params: {
        limit,
        offset,
        search: searchTerm || '',
      },
    });
  }

  getArticle(id: number) {
    return this.http.get(this.baseUrl + id);
  }
}
