import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeEntry } from 'src/app/_models';
import { TimeEntryService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  entry: TimeEntry;
  isLoading = true;

  constructor(private route: ActivatedRoute, private router: Router, private api: TimeEntryService) { }

  ngOnInit() {
    this.api.getTimeEntry(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.entry = data;
        this.isLoading = false;
      });
  }

  deleteEntry(id) {
    this.isLoading = true;
    this.api.deleteTimeEntry(id)
      .subscribe(_ => {
        this.router.navigate(['/time-entries']);
      });
  }

  pauseEntry(id) { return; }
  resumeEntry(id) { return; }
  stopEntry(id) { return; }
  lockEntry(id) { return; }

}
