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
  editForm: FormGroup;
  isLoading = true;
  isSubmitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
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

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['']
    });

    this.editForm.setValue({ name: this.client.name, color: this.client.color });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    if (this.f.name.value) { this.client.name = this.f.name.value; }
    if (this.f.color.value) { this.client.color = this.f.color.value; }

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
