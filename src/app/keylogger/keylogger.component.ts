import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {AuthenticationService} from '../_services/authentication.service';


@Component({
  selector: 'app-keylogger',
  templateUrl: './keylogger.component.html',
  styleUrls: ['./keylogger.component.css', '../app.component.css'],
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

export class KeyloggerComponent implements OnInit 
{
  user$: Object;
  title : string = "Monitorowanie aktywności";
  isActive : boolean;
  // isActive : boolean = false;
  setting$: Object;
  // isA: number;
  logName: string;
  token: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) 
  { 
    this.route.params.subscribe( params => this.user$ = params.id );
    this.token = localStorage.getItem('token');
    this.logName =  localStorage.getItem('username');
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

    this.data.getKeyloggerSettings(this.user$).subscribe(
      // data => this.messages$ = data 
      data => this.setting$ = data
      // data => console.log(data)
    );

    // this.logName =  localStorage.getItem('username');

    // this.isA = this.setting$['areMessagesMonitored'];
    
  }

  update(settingsId)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/keylogger-settings/' + settingsId + '/change-messages-monitor',
        {
          // "id": 1,
          // "keyloggerUserId": 1,
          // "areMessagesMonitored": 1
        }, {headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
            },
            error => {
                console.log("Error in put request Iwona :( ", error);
            }
        );  
  }
  
  logout()
  {
    console.log("wylogowanie");
    this.authenticationService.logout();
    // this.router.navigate(['']);
  }

}
