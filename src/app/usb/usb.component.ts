import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {AuthenticationService} from '../_services/authentication.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-usb',
  templateUrl: './usb.component.html',
  styleUrls: ['./usb.component.css', '../app.component.css'],
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

export class UsbComponent implements OnInit 
{
  currentDiskFiles$: Object;//to bedziesz aktualizowala, wystawisz sb metode przyjmujaca parametr bedacy id 
  // dysku, kamil bd musial wystawic endpoint przyjmujacy id dysku i zwracajacy zawartosc tabeli informacje-skanowanie
  // czy jakos tak, z wierszami, ktore dotycza tego id dysku, przy nacisnieciu przycisku POKAZ wywolasz te metode
  // i ustawisz dzieki temu na nowo zawartosc tego objectu, a ten object bd uzywany do zapelniania tabeli w ngfor
  // wiec powinno zawsze zmieniac dane poprawnie
  allCurrentDevices: Object;
  allHistoryDevices: Object;

  allCurrentDrives: Object;
  allHistoryDrives: Object;

  USBBlockSettings: Object;
  discMonitorAndScanSettings: Object;
  remoteMemoryMonitorAndScanSettings: Object;

  driveFiles: Object;
  historyDriveFiles: Object;

  user$: Object;
  title : string = "Urządzenia i pamięć";
  userId: Number;
  driveId: Number;

  interval: any;
  subscription: Subscription;
  statusText: string;

  is1: boolean = true;
  is2: boolean = true;
  is3: boolean = true;
  is4: boolean = true;
  is5: boolean = true;
  is6: boolean = true;
  showName: string;
  showNameHistoric: string;

  freq: number = 1;
  bookmark: number = 1; // 1, 2 or 3
  bookmarkSecond: number = 1; // 1, 2
  bookmarkThird: number = 1;
  fileDesign: boolean = false;

  logName: string;
  token: string;

  query1: string;
  query2: string;
  query3: string;
  query4: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private data: DataService, private location: Location, private authenticationService: AuthenticationService) 
  { 
    this.route.params.subscribe( params => this.userId = params.id );
    this.token = localStorage.getItem('token');
  }

 ngOnInit() 
 {
     this.data.getUser(this.userId).subscribe(
       data => this.user$ = data 
     );

     this.logName =  localStorage.getItem('username');

     this.data.getAllDevices(this.userId).subscribe( 
      data => this.allCurrentDevices = data
      // data => console.log(data)
    );

    this.data.getAllDevicesHistory(this.userId).subscribe( 
      data => this.allHistoryDevices = data
      // data => console.log(data)
    );

    this.data.getAllDiscDrives(this.userId).subscribe( 
      data => this.allCurrentDrives = data
      // data => console.log(data)
    );

    this.data.getAllDiscDrivesHistory(this.userId).subscribe( 
      data => this.allHistoryDrives = data
      // data => console.log(data)
    );

    // this.data.getUSBBlockingSettings(this.userId).subscribe( 
    //   data => this.USBSettings = data
    //   // data => console.log(data)
    // );

    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.data.getUSBBlockingSettings(this.userId))
    // ).subscribe(data => console.log('poszlo', data));
    ).subscribe(data => this.USBBlockSettings = data);

    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.data.getDiscMonitoringAndScaningSettings(this.userId))
    // ).subscribe(data => console.log('poszlo', data));
    ).subscribe(data => this.discMonitorAndScanSettings = data);

    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.data.getRemoteMemoryMonitoringAndScaningSettings(this.userId))
    // ).subscribe(data => console.log('poszlo', data));
    ).subscribe(data => this.remoteMemoryMonitorAndScanSettings = data);

    // this.subscription = timer(0, 2000).pipe(
    //   switchMap(() => this.data.getDriveFiles(this.driveId))
    // // ).subscribe(data => console.log('poszlo', data));
    // ).subscribe(data => this.driveFiles = data);

 }

 updateUSBBlockingSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/usb-blocking/' + this.userId + '/change-blocking',
        {
          // "blockPorts": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateUSBBlockingSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateUSBBlockingSettings", error);
            }
        );  
  }

  updateDiscMonitoringSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/disc-drives/' + this.userId + '/change-monitoring',
        {
          // "blockPorts": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateDiscMonitoringSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateDiscMonitoringSettings", error);
            }
        );  
  }

  updateDiscScaningSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/disc-drives/' + this.userId + '/change-scanning',
        {
          // "blockPorts": !is 
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateDiscScaningSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateDiscScaningSettings", error);
            }
        );  
  }

  updateRemoteMemoryMonitoringSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/usb-monitoring-settings/' + this.userId + '/change-usb-monitoring-status',
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateRemoteMemoryMonitoringSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateRemoteMemoryMonitoringSettings", error);
            }
        );  
  }

  updateRemoteMemoryScaningSettings()
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    this.http.put('http://localhost:8080/api/usb-monitoring-settings/' + this.userId + '/change-usb-scanning-status',
        {
        },{headers})
        .subscribe(
            data => {
                console.log("PUT Request is successful - updateRemoteMemoryScaningSettings", data);
            },
            error => {
                console.log("Error in put request Iwona :( - updateRemoteMemoryScaningSettings", error);
            }
        );  
  }

 goBack() 
 {
   // window.history.back();
   this.location.back();
 }

//  ngOnDestroy() {
//    this.subscription.unsubscribe();
//  }

logout()
{
  console.log("wylogowanie");
  this.authenticationService.logout();
  // this.router.navigate(['']);
}

 change1() {this.is1 = !this.is1;}
 change2() {this.is2 = !this.is2;}
 change3() {this.is3 = !this.is3;}
 change4() {this.is4 = !this.is4;}
 change5() {this.is5 = !this.is5;}

 showCurrentFiles(driveId, driveName)
 {
  this.data.getDriveFiles(driveId).subscribe( 
    data => this.driveFiles = data
    // data => console.log(data)
  );

  this.showName = driveName;

 }

 showHistoryFiles(driveId, driveName)
 {
  this.fileDesign = true;

  this.data.getHistoryDriveFiles(driveId).subscribe( 
    data => this.historyDriveFiles = data
    // data => console.log(data)
  );

  this.showNameHistoric = driveName;

 }

//  show(name)
//  {
//   this.showName = name;
//  }

changeBookmark(nr)
 {
    this.bookmark = nr;
 } 

 changeBookmarkSecond(nr)
 {
    this.bookmarkSecond = nr;
 }

 changeBookmarkThird(nr)
 {
    this.bookmarkThird = nr;
 }

// turnOnFileDesign(nr)
//  {
//     this.fileDesign = true;
//     // nr wykorzystasz do pokazania plikow z dysku o tym numerze
//  }

 turnOffFileDesign()
 {
  this.fileDesign = false;
 }

 search(nr)
  {
    if(nr === 1)
    {
      if(this.query1 === "")
      {
        this.data.getAllDevices(this.userId).subscribe(
          data => this.allCurrentDevices = data,
          error => {
            console.log('Error GET ALLDEVICES :( ', localStorage.getItem('token'), error);
          }
        );
      }
      else
      {
        this.data.getFilteredDevices(this.query1, this.userId).subscribe(
          data => this.allCurrentDevices = data, 
          error => {
            console.log('Error GET FILTERED ALLDEVICES :( ', localStorage.getItem('token'), error);
          }
        );
      }
    }
    if(nr === 2)
    {
      if(this.query2 === "")
      {
        this.data.getAllDevicesHistory(this.userId).subscribe(
          data => this.allHistoryDevices = data,
          error => {
            console.log('Error GET ALLDEVICESHISTORY :( ', localStorage.getItem('token'), error);
          }
        );
      }
      else
      {
        this.data.getFilteredDevicesHistory(this.query2, this.userId).subscribe(
          data => this.allHistoryDevices = data, 
          error => {
            console.log('Error GET FILTERED ALLDEVICESHISTORY :( ', localStorage.getItem('token'), error);
          }
        );
      }
    }
    if(nr === 3)
    {
      if(this.query3 === "")
      {
        this.data.getAllDiscDrives(this.userId).subscribe(
          data => this.allCurrentDrives = data,
          error => {
            console.log('Error GET DISCDRIVES :( ', localStorage.getItem('token'), error);
          }
        );
      }
      else
      {
        this.data.getFilteredDiscDrives(this.query3, this.userId).subscribe(
          data => this.allCurrentDrives = data, 
          error => {
            console.log('Error GET FILTERED DISDRIVES :( ', localStorage.getItem('token'), error);
          }
        );
      }
    }
    if(nr === 4)
    {
      if(this.query4 === "")
      {
        this.data.getAllDiscDrivesHistory(this.userId).subscribe(
          data => this.allHistoryDrives = data,
          error => {
            console.log('Error GET DISKDRIVESHISTORY :( ', localStorage.getItem('token'), error);
          }
        );
      }
      else
      {
          this.data.getFilteredDiscDrivesHistory(this.query4, this.userId).subscribe(
          data => this.allHistoryDrives = data, 
          error => {
            console.log('Error GET FILTERED DISKDRIVESHISTORY :( ', localStorage.getItem('token'), error);
          }
        );
      }
    }
    
  }

  reset(nr)
  {
    if(nr === 1)
    {
      this.query1 = "";
      this.data.getAllDevices(this.userId).subscribe(
        data => this.allCurrentDevices = data,
        error => {
          console.log('Error GET ALLDEVICES :( ', localStorage.getItem('token'), error);
        }
      );
    }
    if(nr === 2)
    {
      this.query2 = "";
      this.data.getAllDevicesHistory(this.userId).subscribe(
        data => this.allHistoryDevices = data,
        error => {
          console.log('Error GET ALLDEVICESHISTORY :( ', localStorage.getItem('token'), error);
        }
      );
    }
    if(nr === 3)
    {
      this.query3 = "";
      this.data.getAllDiscDrives(this.userId).subscribe(
        data => this.allCurrentDrives = data,
        error => {
          console.log('Error GET DISCDRIVES :( ', localStorage.getItem('token'), error);
        }
      );
    }
    if(nr === 4)
    {
      this.query4 = "";
      this.data.getAllDiscDrivesHistory(this.userId).subscribe(
        data => this.allHistoryDrives = data,
        error => {
          console.log('Error GET DISKDRIVESHISTORY :( ', localStorage.getItem('token'), error);
        }
      );
    }
    
  }

 freqM()  {};

 //*ngFor = "let pack of packs | paginate: { itemsPerPage: 5, currentPage: p }" style="white-space:pre-wrap;"

}