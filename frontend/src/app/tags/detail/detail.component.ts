import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/_services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  tag: Tag;
  isLoading = true;

  constructor(private route: ActivatedRoute, private router: Router, private api: TagService) { }

  ngOnInit() {
    this.api.getTag(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.tag = data;
        this.isLoading = false;
      });
  }

  deleteTag(id) {
    this.isLoading = true;
    this.api.deleteTag(id)
      .subscribe(_ => {
        this.router.navigate(['/tags']);
      });
  }

}
