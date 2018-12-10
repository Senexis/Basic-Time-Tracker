import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models';
import { ClientService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ClientService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['']
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.api.addClient(new Client(this.f.name.value, this.f.color.value))
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
