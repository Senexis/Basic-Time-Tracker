import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: User;
  error = '';
  isLoading = true;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: UserService
  ) { }

  ngOnInit() {
    this.api.getUser(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.user = data;
        this.isLoading = false;
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.api.updateUser(this.route.snapshot.params['id'], this.user)
      .pipe(first())
      .subscribe(res => {
        this.router.navigate(['/users', res['_id']]);
      },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
