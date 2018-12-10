import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/_services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  client: Client;
  isLoading = true;

  constructor(private route: ActivatedRoute, private router: Router, private api: ClientService) { }

  ngOnInit() {
    this.api.getClient(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.client = data;
        this.isLoading = false;
      });
  }

  deleteClient(id) {
    this.isLoading = true;
    this.api.deleteClient(id)
      .subscribe(_ => {
        this.router.navigate(['/clients']);
      });
  }
}
