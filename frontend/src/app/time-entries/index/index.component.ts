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

  entries: Observable<TimeEntry[]>;
  isLoading = true;

  constructor(private api: TimeEntryService) { }

  ngOnInit() {
    this.entries = this.api.getTimeEntries();
  }

}
