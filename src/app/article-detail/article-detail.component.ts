import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpaceflightService } from '../spaceflight.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article: Article | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private spaceflightService: SpaceflightService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.spaceflightService.getArticle(Number(params.get('id')))
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((article) => (this.article = article as Article));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
