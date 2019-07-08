import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css', '../app.component.css'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class NetworkComponent implements OnInit 
{

  title : string = 'Połączenie internetowe';
  user$: Object;
  logName: string;

  constructor(private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) 
  { 
    this.route.params.subscribe( params => this.user$ = params.id );
  }

  goBack() 
  {
    // window.history.back();
    this.location.back();
  }

  ngOnInit() 
  {
    this.data.getUser(this.user$).subscribe(
      data => this.user$ = data 
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
