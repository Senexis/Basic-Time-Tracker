import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models';
import { TagService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  tag: Tag;
  isLoading = true;

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
