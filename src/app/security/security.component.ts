import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css', '../app.component.css'],
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

export class SecurityComponent implements OnInit {

  messages: Object;
  messageDatas: Object;
  user$: Object;
  title : string = "Uprawnienia";

  userId: Number;
  interval: any;
  subscription: Subscription;
  statusText: string;

  constructor(private route: ActivatedRoute, private data: DataService, private location: Location) { 
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
        data => this.user$ = data 
      );

      this.subscription = timer(0, 7000).pipe(
        switchMap(() => this.data.getMessages(this.userId))
      ).subscribe(data => this.messageDatas = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout()
  {
    console.log("wylogowanie");
  }

}

