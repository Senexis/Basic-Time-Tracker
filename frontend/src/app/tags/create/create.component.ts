import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models';
import { TagService } from 'src/app/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  tag: Tag = new Tag();
  isLoading = false;
  isSubmitted = false;
  error = '';

  constructor(
    private router: Router,
    private api: TagService
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.api.addTag(this.tag)
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
