import { Component, OnInit } from '@angular/core';

import { TimeEntry } from '../../_models';
import { TimeEntryService } from '../../_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  entries: TimeEntry[];

  constructor(private api: TimeEntryService) { }

  ngOnInit() {
    this.api.getTimeEntries()
      .subscribe(data => {
        this.entries = data;
      });
  }

}
