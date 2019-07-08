import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

import {timer} from 'rxjs';////////////////////////////////
import {Subscription, pipe} from 'rxjs';///////////////////////////////
import {switchMap} from 'rxjs/operators';///////////////////////////////

@Injectable({
  providedIn: 'root'
})
export class DataService 
{

  token: string;

  constructor(private http: HttpClient) 
  {
    this.token = localStorage.getItem('token');
  }

  // endpoint = 'http://localhost:8080/api/usb-ports/<id użytkownika>';
  // httpOptions =
  // {
  //   headers: new HttpHeaders
  //   ({
  //     'Content-Type':  'application/json'
  //   })
  // };


  getUser(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/keylogger-users/' + userId,
    {
      headers
    });
    // return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  }

  getUsers() {

    const headers = new HttpHeaders()
      .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/keylogger-users',
      {
        headers
      });
    // return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getFilteredUsers(query) 
  {
    const headers = new HttpHeaders()
      .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/keylogger-users/search/' + query,
      {
        headers
      }); 
  }

  getFilteredMessages(query, userId) 
  {
    const headers = new HttpHeaders()
      .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/messages/' + userId + '/search/' + query,
      {
        headers
      });
  }

  getFilteredDevices(query, userId) 
  {
    const headers = new HttpHeaders()
      .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/devices/' + userId + '/search/' + query,
      {
        headers
      }); 
  }

  getFilteredDevicesHistory(query, userId)
  {
    const headers = new HttpHeaders()
      .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/devices/history/' + userId + '/search/' + query,
      {
        headers
      }); 
  }

  getFilteredDiscDrives(query, userId)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/drives/' + userId + '/search/' + query,
    {
      headers
    });
  }

  getFilteredDiscDrivesHistory(query, userId)
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/drives/history/' + userId + '/search/' + query,
    {
      headers
    });
  }

  getDepartments() 
  {
    return this.http.get('http://localhost:8080/api/departaments');
  }

  // getToken() 
  // {
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json');

  //   this.http.post('http://localhost:8080/api/login',
  //     {
  //       // 'username': this.username,
  //       // 'password': this.password,
  //       'username': 'admin',
  //       'password': 'admin',
  //       'departamentId': 1
  //     }, {headers})
  //     .subscribe(
  //       data => {
  //         console.log('POST Request with login is successful ', data);
  //       },
  //       error => {
  //         console.log('Error in post request with login Iwona :(', error);
  //       }
  //     );
  // }

  getAllDevices(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/devices/' + userId,
    {
      headers
    });
  }

  getAllDevicesHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/devices/history/' + userId,
    {
      headers
    });
  }

  getAllDiscDrives(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/drives/' + userId,
    {
      headers
    });
  }

  getAllDiscDrivesHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/drives/history/' + userId,
    {
      headers
    });
  }

  getInternetSettings(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/internet-settings/' + userId,
    {
      headers
    });
  }

  getTransfer(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/current-transfer/' + userId,
    {
      headers
    });
  }

  getTransferHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/current-transfer/history/' + userId,
    {
      headers
    });
  }

  getTransferSinceComputerStarted(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/since-boot-transfer/' + userId,
    {
      headers
    });
  }

  getTransferSinceComputerStartedHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/since-boot-transfer/history/' + userId,
    {
      headers
    });
  }

  getNetworkCard(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/networkcard-info/' + userId,
    {
      headers
    });
  }

  getNetworkCardHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/networkcard-info/history/' + userId,
    {
      headers
    });
  }

  getPing(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/pings/' + userId,
    {
      headers
    });
  }

  getPingHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/pings/history/' + userId,
    {
      headers
    });
  }
 
  getActiveProcess(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/active-process/' + userId,
    {
      headers
    });
  }

  getActiveProcessHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/active-process/history/' + userId,
    {
      headers
    });
  }

  getUserProcess(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/processes/' + userId,
    {
      headers
    });
  }

  getUserProcessHistory(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/processes/history/' + userId,
    {
      headers
    });
  }

  getMessages(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/messages/' + userId,
    {
      headers
    });
  }

  getFilters(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/keylogger-filter/' + userId,
    {
      headers
    });
  }

  // getFilters(userId) {
  //   return timer(0, 10000)
  //       .pipe(
  //          switchMap(_ => this.http.get('http://localhost:8080/api/keylogger-filter/' + userId)),
  //          catchError(error => of(`Bad request: ${error}`))
  //       );
  // }
  //-----------------------------------------------------------------------------------------------

  // postFilter() {
  //   return this.http.post('http://localhost:8080//api/keylogger-filter');
  // }

  // postFilter() 
  // {
  //   return this.http.post('http://localhost:8080//api/keylogger-filter',
  //      {
  //         filter: "dm",
  //         // id: 2, 
  //         keyloggerUserId: 2
  //      }
  //   );
  // }

  postFilter(word) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    var body = 'filter=' + word;
    this.http.post('http://localhost:8080/user/all', body).subscribe((data) => {
    });
  }

  getKeyloggerSettings(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/keylogger-settings/' + userId,
    {
      headers
    });
  }

  getUSBBlockingSettings(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/usb-blocking/' + userId,
    {
      headers
    });
  }

  // getActiveProcessMonitoringSettings(userId) 
  // {
  //   const headers = new HttpHeaders()
  //   .set('X-Auth-Token', this.token);

  //   return this.http.get('http://localhost:8080/api/process-settings/' + userId,
  //       //NIE MA ENDPOINTA! 
  //   {
  //     headers 
  //   });
  // }

  getActiveAndUserProcessMonitoringSettings(userId) // both active and user processes are here in this link 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/process-settings/' + userId,
    {
      headers
    });
  }

  getDiscMonitoringAndScaningSettings(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/disc-drives/' + userId,
    {
      headers
    });
  }

  getRemoteMemoryMonitoringAndScaningSettings(userId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/usb-monitoring-settings/' + userId,
    {
      headers
    });
  }

  getDriveFiles(driveId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/drive-files/' + driveId,
    {
      headers
    });
  }

  getHistoryDriveFiles(driveId) 
  {
    const headers = new HttpHeaders()
    .set('X-Auth-Token', this.token);

    return this.http.get('http://localhost:8080/api/drive-files/history/' + driveId,
    {
      headers
    });
  }
  

}
