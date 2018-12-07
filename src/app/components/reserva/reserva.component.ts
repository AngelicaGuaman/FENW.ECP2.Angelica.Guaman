import {Component, OnInit} from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ReservationsService} from '../../shared/services/reservations.service';
import {Reservation} from '../../shared/models/reservation.model';

import {ToastrService} from 'ngx-toastr';

import {IMyDpOptions} from 'mydatepicker';
import {Court} from '../../shared/models/court.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ReservaComponent implements OnInit {
  reservationsByLoggedUser: Reservation[] = [];
  allReservations: Reservation[] = [];
  allReservationsByCourt: Court[] = [];

  MAX_COURT = 4;
  today = new Date();
  hours = [];
  court: Court;
  hora;
  courtSelected: Court;
  hourSelected;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  public mydate: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    }
  };

  constructor(private reservation: ReservationsService, private toast: ToastrService) {
    this.court = new Court(0, []);
  }

  ngOnInit() {
    this.getAllReservationsByLoggedUser();
    this.getAllReservations();
  }

  getAllReservationsByLoggedUser() {
    this.reservation.getAllReservationsByLoggedUser().subscribe(
      response => {
        if (response) {
          response.forEach((element) => {
            this.reservationsByLoggedUser.push(element);
          });
        } else {
          this.toast.error('No se ha podido recuperar los datos correctamente', 'Error');
        }
      });
  }

  getAllReservations() {
    this.allReservations = [];
    const dateFormat = new Date(this.mydate.date.year, this.mydate.date.month - 1, this.mydate.date.day);

    this.reservation.getAllReservationsByAllUsersInASpecificDate(dateFormat.getTime()).subscribe(
      response => {
        if (response) {
          this.fillCourts();
          response.forEach((element) => {
            this.allReservations.push(element);
            if (element.courtId === 1) {
              this.hora = this.allReservationsByCourt[0].hours.indexOf(element.rsvtime);
              this.allReservationsByCourt[0].hours.splice(this.hora, 1);
            } else if (element.courtId === 2) {
              this.hora = this.allReservationsByCourt[1].hours.indexOf(element.rsvtime);
              this.allReservationsByCourt[1].hours.splice(this.hora, 1);
            } else if (element.courtId === 3) {
              this.hora = this.allReservationsByCourt[2].hours.indexOf(element.rsvtime);
              this.allReservationsByCourt[2].hours.splice(this.hora, 1);
            } else if (element.courtId === 4) {
              this.hora = this.allReservationsByCourt[3].hours.indexOf(element.rsvtime);
              this.allReservationsByCourt[3].hours.splice(this.hora, 1);
            }
          });
          console.log(this.allReservationsByCourt);
          console.log(this.allReservations);
        } else {
          this.toast.error('No se ha podido recuperar los datos correctamente', 'Error');
        }
      });
  }

  fillCourts() {
    this.allReservationsByCourt = [];

    for (let i = 0; i < this.MAX_COURT; i++) {
      this.hours = [];

      for (let j = 10; j < 22; j++) {
        this.hours.push(j.toString() + ':00');
      }

      this.court.id = Number(i + 1);
      this.court.hours = this.hours;

      this.allReservationsByCourt[i] = this.court;
    }
  }

  doReservation() {
    const dateFormat = new Date(this.mydate.date.year, this.mydate.date.month - 1, this.mydate.date.day);

    dateFormat.setHours(Number(this.hourSelected));
    this.reservation.doReservation(this.courtSelected.id, dateFormat.getTime());
  }
}

