import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  client: Client;
  isLoading = true;
  isSubmitted = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ClientService
  ) { }

  ngOnInit() {
    this.api.getClient(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.client = data;
        this.isLoading = false;
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.api.updateClient(this.route.snapshot.params['id'], this.client)
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
