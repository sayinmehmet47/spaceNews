import { Component } from '@angular/core';
import { SpaceflightService } from '../spaceflight.service';
import { Articles } from '../article';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent {
  private static readonly INITIAL_ARTICLES_COUNT = 5;
  private static readonly ADDITIONAL_ARTICLES_COUNT = 2;

  limit = ArticleListComponent.INITIAL_ARTICLES_COUNT;
  offset = this.limit - ArticleListComponent.ADDITIONAL_ARTICLES_COUNT;
  articles: Articles | undefined;
  searchTerm: string | undefined;
  isLoading = false;
  searchSubject = new Subject<string>();

  constructor(private spaceflightService: SpaceflightService) {
    this.fetchArticles(this.limit);

    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((searchTerm) => {
          this.isLoading = true;
          return this.spaceflightService.getArticles(this.limit, 0, searchTerm);
        })
      )
      .subscribe({
        next: (data) => {
          this.articles = data as Articles;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
  }

  fetchArticles(limit: number, offset?: number, searchTerm?: string) {
    this.isLoading = true;
    this.spaceflightService.getArticles(limit, offset, searchTerm).subscribe({
      next: (data) => {
        if (this.articles && offset) {
          this.articles.results.push(...(data as Articles).results);
        } else {
          this.articles = data as Articles;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  onLoadMore() {
    this.offset += ArticleListComponent.ADDITIONAL_ARTICLES_COUNT;
    this.fetchArticles(
      ArticleListComponent.ADDITIONAL_ARTICLES_COUNT,
      this.offset,
      this.searchTerm
    );
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }
}
