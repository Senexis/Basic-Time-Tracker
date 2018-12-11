import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  user: User = new User();
  isLoading = false;
  isSubmitted = false;
  error = '';

  constructor(
    private router: Router,
    private api: UserService
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.api.addUser(this.user)
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
