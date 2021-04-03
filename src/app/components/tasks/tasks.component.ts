import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  logout() {
    this.loginService.logOut();
  }
}
