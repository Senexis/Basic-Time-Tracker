import { Component, OnInit } from '@angular/core';
import { TimeEntryService, ClientService, TagService } from 'src/app/_services';
import { Tag, Client, TimeEntry } from 'src/app/_models';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  clients: Client[];
  entry: TimeEntry = new TimeEntry();
  error = '';
  isLoading = true;
  isSubmitted = false;
  tags: Tag[];

  constructor(
    private router: Router,
    private tes: TimeEntryService,
    private cs: ClientService,
    private ts: TagService
  ) { }

  ngOnInit() {
    this.populateFields();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.tes.addTimeEntry(this.entry)
      .pipe(first())
      .subscribe(res => {
        this.router.navigate(['/time-entries', res['_id']]);
      },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }

  populateFields() {
    this.cs.getClients()
      .subscribe(clients => {
        this.clients = clients;

        this.ts.getTags()
          .subscribe(tags => {
            this.tags = tags;
            this.isLoading = false;
          });
      });
  }
}
