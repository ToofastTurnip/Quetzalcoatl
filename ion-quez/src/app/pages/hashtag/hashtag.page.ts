import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-hashtag',
  templateUrl: 'hashtag.page.html',
  styleUrls: ['hashtag.page.scss']
})
export class HashtagPage implements OnInit {
  tag = '';
  posts$!: Observable<IPost[]>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.tag = this.route.snapshot.params['tag'];
    this.posts$ = this.postService.getPostsByHashtag(this.tag);
  }

  trackById(_: number, post: IPost): string {
    return post.id;
  }
}
