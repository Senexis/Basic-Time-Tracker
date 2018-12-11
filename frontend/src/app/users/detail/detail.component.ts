import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: User;
  isLoading = true;

  constructor(private route: ActivatedRoute, private router: Router, private api: UserService) { }

  ngOnInit() {
    this.api.getUser(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.user = data;
        this.isLoading = false;
      });
  }

  deleteUser(id) {
    this.isLoading = true;
    this.api.deleteUser(id)
      .subscribe(_ => {
        this.router.navigate(['/users']);
      });
  }

}
