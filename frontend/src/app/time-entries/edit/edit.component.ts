import { Component, OnInit } from '@angular/core';
import { TimeEntryService, ClientService, TagService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { Client, Tag, TimeEntry } from 'src/app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  clients: Client[];
  entry: TimeEntry;
  error = '';
  isLoading = true;
  isSubmitted = false;
  tags: Tag[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tes: TimeEntryService,
    private cs: ClientService,
    private ts: TagService
  ) { }

  ngOnInit() {
    this.populateFields();

    this.tes.getTimeEntry(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.entry = data;
        this.isLoading = false;
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;

    this.tes.updateTimeEntry(this.route.snapshot.params['id'], this.entry)
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
