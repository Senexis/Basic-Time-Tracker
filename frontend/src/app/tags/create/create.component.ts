import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models';
import { TagService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  tag: Tag;
  isLoading = false;

  constructor(private api: TagService, private router: Router) { }

  ngOnInit() {}

  onSubmit(value: Tag) {
    console.log(value);
    this.api.addTag(value)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/tags', id]);
        });
  }

}
