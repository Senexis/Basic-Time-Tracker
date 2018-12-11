import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  users: User[];
  isLoading = true;

  constructor(private api: UserService) { }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(data => {
        console.log(data);
        this.users = data;
        this.isLoading = false;
      });
  }
}
