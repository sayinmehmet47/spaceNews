import { Component } from '@angular/core';
import { SpaceflightService } from '../spaceflight.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent {
  article: Article | undefined;

  constructor(
    private spaceflightService: SpaceflightService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spaceflightService.getArticle(id).subscribe((article) => {
      this.article = article as Article;
    });
  }
}
