import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpaceflightService } from '../spaceflight.service';
import { Articles } from '../article';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, tap, takeUntil } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  private static readonly INITIAL_ARTICLES_COUNT = 5;
  private static readonly ADDITIONAL_ARTICLES_COUNT = 2;

  limit = ArticleListComponent.INITIAL_ARTICLES_COUNT;
  offset = this.limit - ArticleListComponent.ADDITIONAL_ARTICLES_COUNT;
  articles$ = new BehaviorSubject<Articles | null>(null);
  searchTerm: string | undefined;
  isLoading = false;
  searchForm = this.fb.group({
    search: [''],
  });
  private destroy$ = new Subject<void>();

  constructor(
    private spaceflightService: SpaceflightService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchArticles(this.limit);

    this.searchForm
      .get('search')!
      .valueChanges.pipe(
        debounceTime(300),
        switchMap((searchTerm) => {
          this.searchTerm = searchTerm || undefined;
          this.isLoading = true;
          return this.spaceflightService.getArticles(
            this.limit,
            0,
            searchTerm || undefined
          );
        }),
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((articles) => this.articles$.next(articles as Articles));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLoadMore() {
    this.offset += ArticleListComponent.ADDITIONAL_ARTICLES_COUNT;
    this.fetchArticles(
      ArticleListComponent.ADDITIONAL_ARTICLES_COUNT,
      this.offset,
      this.searchTerm || undefined
    );
  }

  fetchArticles(limit: number, offset?: number, searchTerm?: string) {
    this.isLoading = true;
    this.spaceflightService.getArticles(limit, offset, searchTerm).subscribe({
      next: (data) => {
        let currentArticles = this.articles$.value;
        if (currentArticles && offset) {
          currentArticles.results.push(...(data as Articles).results);
          this.articles$.next(currentArticles);
        } else {
          this.articles$.next(data as Articles);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }
}
