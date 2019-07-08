import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../app.component.css'],
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

export class MessagesComponent implements OnInit 
{
  messages: Object;
  messageDatas: Object;
  user: Object;
  title : string = "Wiadomości";
  logName: string;

  userId: Number;
  interval: any;
  subscription: Subscription;
  statusText: string;

  query: string;

  constructor(private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) { 
    this.route.params.subscribe( params => this.userId = params.id );
 }

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

      this.data.getMessages(this.userId).subscribe(
        // data => this.messages$ = data 
        data => this.messageDatas = data
        // data => console.log(data)
      );

      // this.subscription = timer(0, 7000).pipe(
      //   switchMap(() => this.data.getMessages(this.userId))
      // ).subscribe(data => this.messageDatas = data);

      this.logName =  localStorage.getItem('username');
  }

  search()
  {
    if(this.query === "")
    {
      this.data.getMessages(this.userId).subscribe(
        data => this.messageDatas = data,
        error => {
          console.log('Error GET MESSAGES :( ', localStorage.getItem('token'), error);
        }
      );
    }
    else
    {
      this.data.getFilteredMessages(this.query, this.userId).subscribe(
        data => this.messageDatas = data, 
        error => {
          console.log('Error GET FILTERED MESSAGES :( ', localStorage.getItem('token'), error);
        }
      );
    }
  }

  reset()
  {
    this.query = "";
    this.data.getMessages(this.userId).subscribe(
      data => this.messageDatas = data,
      error => {
        console.log('Error GET MESSAGES :( ', localStorage.getItem('token'), error);
      }
    );
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  logout()
  {
    console.log("wylogowanie");
    this.authenticationService.logout();
    // this.router.navigate(['']);
  }

}
