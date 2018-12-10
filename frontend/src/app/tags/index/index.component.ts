import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models';
import { TagService } from 'src/app/_services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tags: Tag[];
  isLoading = true;

  constructor(private api: TagService) { }

  ngOnInit() {
    this.api.getTags()
      .subscribe(data => {
        this.tags = data;
        this.isLoading = false;
      });
  }
}
