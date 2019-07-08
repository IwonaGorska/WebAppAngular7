import {DataService} from '../data.service';
import {Observable} from 'rxjs';
import * as snapsvg from 'snapsvg';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

import {ILogin} from '../login';
import {AuthService} from '../auth.service';
import {Location} from '@angular/common';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit 
{
  title = 'LogIT';
  filtr: string;
  departments: Object;

  username: string;
  password: string;
  departmentId: number;
  departmentName: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private data: DataService, private authenticationService: AuthenticationService) {
  }

  // constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

  ngOnInit() 
  {
    //    this.data.getDepartments().subscribe(
    //   data => this.departments = data
    // )
    // .subscribe(
    //           data => {
    //             console.log('POST Request with login is successful ', data);
    //           },
    //           error => {
    //             console.log('Error in post request with login Iwona :(', error);
    //           } );
  
    

    this.data.getDepartments().subscribe(
      data => this.departments = data,
      error => {
        console.log('Error GET DEPARTMENTS :( ', error);
      }
    );
  }

  

  // log(username, password, departamentId) // zastanow sie czy to wgl przekazywac tedy czy przez this.
  onSubmit() 
  {
    // stop here if form is invalid

    // this.authenticationService.login('admin', 'admin', 1)
    this.authenticationService.login(this.username, this.password, this.departmentId)
      .pipe(first())
      .subscribe(
        data => {
          console.log(localStorage.getItem('token'));
        }
      );
  }

  // const headers = new HttpHeaders()
  //   .set('Content-Type', 'application/json');

  // this.http.post('http://localhost:8080/api/login',
  //   {
  //     // 'username': this.username,
  //     // 'password': this.password,
  //     'username': 'admin',
  //     'password': 'admin',
  //     'departamentId': 1
  //   }, {headers})
  //   }
}
