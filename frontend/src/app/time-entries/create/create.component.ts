import { Component, OnInit } from '@angular/core';
import { TimeEntryService, ClientService, TagService } from 'src/app/_services';
import { Tag, Client, TimeEntry } from 'src/app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  clients: Client[];
  tags: Tag[];
  isLoading = true;

  constructor(private tes: TimeEntryService, private cs: ClientService, private ts: TagService, private router: Router) { }

  ngOnInit() {
    this.populateFields();
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

  onSubmit(value: TimeEntry) {
    console.log(value);
    this.tes.addTimeEntry(value)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/time-entries', id]);
      });
  }

}
