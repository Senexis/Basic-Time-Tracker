import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models';
import { ClientService } from 'src/app/_services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  clients: Client[];
  isLoading = true;

  constructor(private api: ClientService) { }

  ngOnInit() {
    this.api.getClients()
      .subscribe(data => {
        this.clients = data;
        this.isLoading = false;
      });
  }

}
