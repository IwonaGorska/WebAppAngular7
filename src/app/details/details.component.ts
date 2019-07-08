import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../app.component.css'],
})
export class DetailsComponent implements OnInit {

  user$: Object;
  users$: Object;
  userId : number;
  logName: string;
  
  constructor(private route: ActivatedRoute, private data: DataService,  private authenticationService: AuthenticationService) { 
     this.route.params.subscribe( params => this.user$ = params.id );
  }

  ngOnInit() {
    this.data.getUser(this.user$).subscribe(
      data => this.user$ = data 
    );

    this.data.getUsers().subscribe(
      data => this.users$ = data 
    );

    this.logName =  localStorage.getItem('username');

  }

  logout()
  {
    console.log("wylogowanie");
    this.authenticationService.logout();
    // this.router.navigate(['']);
  }
  

}