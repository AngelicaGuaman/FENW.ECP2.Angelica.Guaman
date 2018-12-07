import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Reservation} from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private baseurl = 'http://fenw.etsisi.upm.es:5555/reservations';

  constructor(private http: HttpClient) {
  }

  getAllReservationsByLoggedUser() {
    return this.http.get<Reservation[]>(this.baseurl, {
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('accessToken')})
    });
  }

  getAllReservationsByAllUsersInASpecificDate(dateNumber: number) {
    console.log(dateNumber);
    return this.http.get<Reservation[]>(this.baseurl + '/' + dateNumber, {
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('accessToken')})
    });
  }

  doReservation(courtId: number, rsvdateTime: number) {
    return this.http.post(this.baseurl, {courtId: courtId, rsvdateTime: rsvdateTime}, {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('accessToken')}),
      observe: 'response'
    });
  }
}
