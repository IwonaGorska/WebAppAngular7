import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css', '../app.component.css'],
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

export class ProcessesComponent implements OnInit 
{
  messageDatas: Object;
  activeAndUserProcessMonitorSettings: Object;
  user$: Object;
  title : string = "Procesy";

  userId: Number;
  interval: any;
  subscription: Subscription;
  statusText: string;

  is1: boolean = true;
  is2: boolean = true;
  freq: number = 1;
  logName: string;

  activeProcesses: Object;
  historyActiveProcesses: Object;
  userProcesses: Object;
  historyUserProcesses: Object;

  bookmark: number = 1; // 1 or 2
  bookmarkSecond: number = 1; // 1 or 2

  token: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) { 
    this.route.params.subscribe( params => this.userId = params.id );
    this.token = localStorage.getItem('token');
 }

  goBack() 
  {
    // window.history.back();
    this.location.back();
  }

  ngOnInit() 
  {
      this.data.getUser(this.userId).subscribe(
        data => this.user$ = data 
      );

      this.data.getActiveProcess(this.userId).subscribe( 
        data => this.activeProcesses = data
        // data => console.log(data)
      );
  
      this.data.getActiveProcessHistory(this.userId).subscribe( 
        data => this.historyActiveProcesses = data
        // data => console.log(data)
      );

      this.data.getUserProcess(this.userId).subscribe( 
        data => this.userProcesses = data
        // data => console.log(data)
      );
   
      this.data.getUserProcessHistory(this.userId).subscribe( 
        data => this.historyUserProcesses = data
        // data => console.log(data)
      );

      this.subscription = timer(0, 7000).pipe(
        switchMap(() => this.data.getActiveAndUserProcessMonitoringSettings(this.userId))
      ).subscribe(data => this.activeAndUserProcessMonitorSettings = data);

      this.logName =  localStorage.getItem('username');
  }

  updateActiveProcessMonitoringSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/process-settings/' + this.userId + '/change-active-process-monitoring-status',
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateActiveProcessMonitoringSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateActiveProcessMonitoringSettings", error);
            }
        );  
  }

  updateUserProcessMonitoringSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/process-settings/' + this.userId + '/change-processes-monitoring-status',
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateUserProcessMonitoringSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateUserProcessMonitoringSettings", error);
            }
        );  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout()
  {
    console.log("wylogowanie");
    this.authenticationService.logout();
    // this.router.navigate(['']);
  }

  change1() {this.is1 = !this.is1;}
  change2() {this.is2 = !this.is2;}

  changeBookmark(nr)
 {
    this.bookmark = nr;
 }

 changeBookmarkSecond(nr)
 {
    this.bookmarkSecond = nr;
 }

  // nie musze przekazywac paraetrow, bo userId jest widoczny w komponencie, a na freq jest 
  // wiazanie ng model i tez pochodzi z tego komponentu, wiec zawsze swieze widoczne 
  updateUserProcessMonitorFrequency()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/process-settings/' + this.userId + '/change-processes-monitoring-interval/' + this.freq,
        {},{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateUserProcessMonitorFrequency", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateUserProcessMonitorFrequency", error);
            }
        );  
        
  }

  //*ngFor = "let pack of packs | paginate: { itemsPerPage: 5, currentPage: p }" style="white-space:pre-wrap;"

}
