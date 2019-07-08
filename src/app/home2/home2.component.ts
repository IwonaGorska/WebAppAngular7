import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Observable} from 'rxjs';
import * as snapsvg from 'snapsvg';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css', '../app.component.css'],
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
export class Home2Component implements OnInit {
  title = 'LogIT';
  filtr: string;
  users: Object;
  filteredUsers: Object;

  p: number = 1;

  id: string;
  query: string;
  // constructor(private router: Router,public authService: AuthService) { }

  // ngOnInit() {
  //   this.id = localStorage.getItem('token');
  // }

  subscription: Subscription;
  statusText: string;


  constructor(private http: HttpClient, private data: DataService, private router: Router, public authService: AuthService,  private authenticationService: AuthenticationService) 
  {
    //NA NIE LADOWANIE SIE W ODPOWIEDNIM MOMENCIE (CO SKUTKOWALO NIE WYSWIETLENIEM SIE) USEROW POMOGLO
    // PRZENIESIENIE TEGO DO KONSTRUKTORA
    // this.data.getUsers().subscribe(
    //   data => this.users$ = data,
    //   // data => {
    //   //             console.log('GET USERS ');
    //   //           },
    //   error => {
    //     console.log('Error GET USERS :( ', localStorage.getItem('token'), error);
    //   }
    // );
  }

  ngOnInit() 
  {
    this.ionViewDidLoad();
    this.data.getUsers().subscribe(
      data => this.users = data,
      // data => {
      //             console.log('GET USERS ');
      //           },
      error => {
        console.log('Error GET USERS :( ', localStorage.getItem('token'), error);
      }
    );

    // this.subscription = timer(0, 2000).pipe(
    //   switchMap(() => this.data.getUsers())
    // // ).subscribe(data => console.log('poszlo', data));
    // ).subscribe(data => this.users$ = data);
  }

  search()
  {
    if(this.query === "")
    {
      this.data.getUsers().subscribe(
        data => this.users = data,
        error => {
          console.log('Error GET USERS :( ', localStorage.getItem('token'), error);
        }
      );
    }
    else
    {
      this.data.getFilteredUsers(this.query).subscribe(
        data => this.users = data, // MOZE WLASNIE NA USERS SAMYM POWINNO BYC, MOZE FILTEREDUSERS NIEPOTRZEBNE
        // data => {
        //             console.log('GET USERS ');
        //           },
        error => {
          console.log('Error GET FILTERED USERS :( ', localStorage.getItem('token'), error);
        }
      );

      // this.query = ""; MOZE NIE POWINNAM CZYSCIC ZAPYTANIA SAMA 
    }
  }

  reset()
  {
    this.query = "";
    this.data.getUsers().subscribe(
      data => this.users = data,
      error => {
        console.log('Error GET USERS :( ', localStorage.getItem('token'), error);
      }
    );
  }

  // ionViewDidEnter() 
  // ionViewWillEnter()
  ionViewDidLoad()
  {
    console.log("ionViewDidLoad");
    this.data.getUsers().subscribe(
      data => this.users = data,
      // data => {
      //             console.log('GET USERS ');
      //           },
      error => {
        console.log('Error GET USERS :( ', localStorage.getItem('token'), error);
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
