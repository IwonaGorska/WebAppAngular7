import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NumberValueAccessor } from '@angular/forms/src/directives';

import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-net-settings',
  templateUrl: './net-settings.component.html',
  styleUrls: ['./net-settings.component.css', '../app.component.css'],
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
export class NetSettingsComponent implements OnInit {

  title : string = 'Ustawienia internetowe';
  user: Object;
  settings: Object;
  timeCurrentTransfer : number = 1;
  currentTransferFrequency: number;
  sinceStartTransferFrequency : number;
  pingFrequency: number;
  cardFrequency: number;
  address: string;

  interval: any;
  subscription: Subscription;
  userId: Number;
  logName: string;
  token: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) 
  {
    this.route.params.subscribe(params => this.userId = params.id);
    this.token = localStorage.getItem('token');
  }

  is1: boolean = true;
  is2: boolean = true;
  is3: boolean = true;
  is4: boolean = true;
  is5: boolean = true;
  is6: boolean = true;

   

  goBack() 
  {
    // window.history.back();
    this.location.back();
  }

  ngOnInit() 
  {
    this.data.getUser(this.userId).subscribe(
      data => this.user = data
    );

    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.data.getInternetSettings(this.userId))
    // ).subscribe(data => console.log('poszlo', data));
    ).subscribe(data => this.settings = data);
 
    this.logName =  localStorage.getItem('username');
    
    // this.refreshData();
    // this.interval = setInterval(() => {
    //     this.refreshData();
    // }, 5000);
  }
 
  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }

    // this.data.getInternetSettings(this.user).subscribe( 
    //   data => this.settings$ = data
    //   // data => console.log(data)
    // );
 

  change1() {this.is1 = !this.is1;}
  change2() {this.is2 = !this.is2;}
  change3() {this.is3 = !this.is3;}
  change4() {this.is4 = !this.is4;}
  change5() {this.is5 = !this.is5;}
  change6() {this.is6 = !this.is6;}

  updateCurrentTransferMonitorStatus(settingsId, is)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/change-current-transfer-monitor-status',
        {
          "isCurrentTransferMonitored": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateCurrentTransferMonitorStatus", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateCurrentTransferMonitorStatus", error);
            }
        );  
  }

  updateCurrentTransferFrequency(settingsId, timeCurrentTransfer)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/current-transfer-monitor-frequency/' + timeCurrentTransfer,
        {},{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateCurrentTransferFrequency", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateCurrentTransferFrequency", error);
            }
        );  
        
  }

  updateUploadSpeedMonitorStatus(settingsId, is)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/change-upload-speed-monitor-status',
        {
          "isUploadSpeedMonitored": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateUploadSpeedMonitorStatus", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateUploadSpeedMonitorStatus", error);
            }
        );  
  }

  updateDownloadSpeedMonitorStatus(settingsId, is)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/change-download-speed-monitor-status',
        {
          "isDownloadSpeedMonitored": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateDownloadSpeedMonitorStatus", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateDownloadSpeedMonitorStatus", error);
            }
        );  
  }

  updateSinceStartedTransferMonitorStatus(settingsId, is)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/change-transfer-monitor-since-computer-started-status',
        {
          "isTransferMonitoredSinceComputerStarted": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateSinceStartedTransferMonitorStatus", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateSinceStartedTransferMonitorStatus", error);
            }
        );  
  }

  updateSinceStartTransferFrequency(settingsId, timeStartTransfer)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/transfer-monitor-since-computer-started-frequency/' + timeStartTransfer,
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateSinceStartTransferFrequency", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateSinceStartTransferFrequency", error);
            }
        );  
  }

  updateShouldPing(settingsId, is)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/should-ping',
        {
          "shouldPing": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateShouldPing", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateShouldPing", error);
            }
        );  
  }

  updatePingFrequency(settingsId, timePing)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/ping-frequency/' + timePing,
        {
          
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updatePingFrequency", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updatePingFrequency", error);
            }
        );  
  }

  updateNetworkCardMonitorStatus(settingsId, is)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/change-network-card-monitor-status',
        {
          "isNetworkCardInfoMonitor": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateNetworkCardMonitorStatus", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateNetworkCardMonitorStatus", error);
            }
        );  
  }

  updateCardFrequency(settingsId, timeCard)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/network-card-monitor-frequency/' + timeCard,
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateCardFrequency", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateCardFrequency", error);
            }
        );  
  }

  updatePingAddress(settingsId, address)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/internet-settings/' + settingsId + '/ping-address/' + address,
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updatePingAddress", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updatePingAddress", error);
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
