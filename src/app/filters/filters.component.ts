import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
 
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
 
import {BehaviorSubject} from 'rxjs';
// import {map} from 'rxjs/add/operator/map';
// import { map } from "rxjs/operators";
import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
 
 
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css', '../app.component.css'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({opacity: 0, transform: 'translateY(-15px)'}),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({opacity: 1, transform: 'translateY(0px)'})
              )
            )
          ],
          {optional: true}
        ),
        query(':leave', animate('50ms', style({opacity: 0})), {
          optional: true
        })
      ])
    ])
  ]
})
 
export class FiltersComponent implements OnInit 
{
  user$: Object;
  filters: Object;
  title: string = 'Ustawienia filtrów';
  newFiltr: string;
  oldFiltr: string;
  userId: Number;
  logName: string;
  token: string;
 
  interval: any;
 
  subscription: Subscription;
  statusText: string;
 
  constructor(private http: HttpClient, private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) 
  {
    this.route.params.subscribe(params => this.userId = params.id);
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
 
    // this.data.getFilters(this.user$).subscribe(
    //   // data => this.messages$ = data
    //   data => this.filters = data
    //   // data => console.log(data)
    // );  
 
 
    // this.subscription = timer(0, 10000).pipe(
    //   switchMap(() => this.data.getFilters(this.user$))
    // ).subscribe(data => this.filters = data);
 
    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.data.getFilters(this.userId))
    // ).subscribe(data => console.log('poszlo', data));
    ).subscribe(data => this.filters = data);

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
 
//   refreshData(){
//     this.data.getFilters(this.user$).subscribe(
//       // data => this.messages$ = data
//       data => this.filters = data
//       // data => console.log(data)
//     );
// }
 
// public data$: BehaviorSubject<any> = new BehaviorSubject({});
 
// updateData() {
//     let data = this.data.getFilters(this.user$).map((data)=>{
//         return data.json();
//     }).do((data)=>{
//         this.data$.next(data);
//     })
// }
 
  postFilter(idUser) 
  {
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json');

      const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);
 
    this.http.post('http://localhost:8080/api/keylogger-filter',
      {
        'filter': this.newFiltr,
        'keyloggerUserId': idUser
      }, {headers})
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
        },
        error => {
          console.log('Error in post request Iwona :(', error);
        }
      );
 
    this.newFiltr = '';
  }
 
  deleteFilter(id) 
  {
    const filterId = id;
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json');
      const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);
 
    this.http.delete('http://localhost:8080/api/keylogger-filter/' + filterId, {headers})
      .subscribe(
        data => {
          console.log('DELETE Request is successful ');
        },
        error => {
          console.log('Error in delete request Iwona :(', error);
        }
      );
 
 
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // // let options = new RequestOptions({ headers: cpHeaders });
    // return this.http.delete('http://localhost:8080/api/keylogger-filter')
  }
 
  save() 
  {
    this.oldFiltr = this.newFiltr;
    this.newFiltr = '';
  }
 
  logout()
  {
    console.log("wylogowanie");
    this.authenticationService.logout();
    // this.router.navigate(['']);
  }
 
}