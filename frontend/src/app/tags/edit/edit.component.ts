import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models';
import { TagService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  tag: Tag;
  isLoading = true;
  isSubmitted = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: TagService
  ) { }

  ngOnInit() {
    this.api.getTag(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.tag = data;
        this.isLoading = false;
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.api.updateTag(this.route.snapshot.params['id'], this.tag)
      .pipe(first())
      .subscribe(res => {
        this.router.navigate(['/tags', res['_id']]);
      },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
