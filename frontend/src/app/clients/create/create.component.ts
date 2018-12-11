import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models';
import { ClientService } from 'src/app/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  client: Client = new Client(null, null);
  isLoading = false;
  isSubmitted = false;
  error = '';

  constructor(
    private router: Router,
    private api: ClientService
  ) { }

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.api.addClient(this.client)
      .pipe(first())
      .subscribe(res => {
        this.router.navigate(['/clients', res['_id']]);
      },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
