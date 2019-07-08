import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {AuthenticationService} from '../_services/authentication.service';



@Component({
  selector: 'app-net-data',
  templateUrl: './net-data.component.html',
  styleUrls: ['./net-data.component.css', '../app.component.css'],
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
export class NetDataComponent implements OnInit 
{
  title : string = 'Dane internetowe';
  user$: Object;
  netData: Object;
  transfer: Object;
  userId: Number;
  historyTransfers: Object;
  transferSinceComputerStarted: Object;
  historySinceComputerStartedTransfers: Object;
  card: Object;
  historyCards: Object;
  ping: Object;
  historyPings: Object;
  logName: string;

  bookmark: number = 1; // 1 or 2
  bookmarkSecond: number = 1; // 1, 2, 3 or 4

  constructor(private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) 
  { 
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

    this.data.getInternetSettings(this.userId).subscribe( 
      data => this.netData = data
      // data => console.log(data)
    );

    this.data.getTransfer(this.userId).subscribe( 
      data => this.transfer = data
      // data => console.log(data)
    );

    this.data.getTransferHistory(this.userId).subscribe( 
      data => this.historyTransfers = data
      // data => console.log(data)
    );

    this.data.getTransferSinceComputerStarted(this.userId).subscribe( 
      data => this.transferSinceComputerStarted = data
      // data => console.log(data)
    );

    this.data.getTransferSinceComputerStartedHistory(this.userId).subscribe( 
      data => this.historySinceComputerStartedTransfers = data
      // data => console.log(data)
    );

    this.data.getNetworkCard(this.userId).subscribe( 
      data => this.card = data
      // data => console.log(data)
    );

    this.data.getNetworkCardHistory(this.userId).subscribe( 
      data => this.historyCards = data
      // data => console.log(data)
    );

    this.data.getPing(this.userId).subscribe( 
      data => this.ping = data
      // data => console.log(data)
    );

    this.data.getPingHistory(this.userId).subscribe( 
      data => this.historyPings = data
      // data => console.log(data)
    );

    this.logName =  localStorage.getItem('username');
  }

  calculate(number, power)
  {
    number = number/Math.pow(1024, power);
    // var factor = Math.pow(10, k);
    // return Math.round(number*factor)/factor;
    return Math.round(number);
  }

  changeBookmark(nr)
  {
      this.bookmark = nr;
  }

  changeBookmarkSecond(nr)
  {
      this.bookmarkSecond = nr;
  }
  
  logout()
  {
    console.log("wylogowanie");
    this.authenticationService.logout();
    // this.router.navigate(['']);
  }

}
