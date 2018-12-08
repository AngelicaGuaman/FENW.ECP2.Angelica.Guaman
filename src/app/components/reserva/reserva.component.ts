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

  allReservationsByCourtAvailable: Court[] = [];
  allReservationsByCourtUnavailable: Court[] = [];

  MAX_COURT = 4;
  today = new Date();
  hours = [];
  court: Court;
  courtSelected: Court;
  hourSelected;
  hour;

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
    /*this.selectHours(this.allReservationsByCourtAvailable[0]);*/
  }

  getAllReservationsByLoggedUser() {
    this.reservationsByLoggedUser = [];

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
    this.allReservationsByCourtAvailable = [];
    this.allReservationsByCourtUnavailable = [];

    this.fillCourts();

    const dateFormat = new Date(this.mydate.date.year, this.mydate.date.month - 1, this.mydate.date.day);

    this.reservation.getAllReservationsByAllUsersInASpecificDate(dateFormat.getTime()).subscribe(
      response => {
        if (response) {
          response.forEach((element) => {
            this.allReservations.push(element);
          });
          console.log('Todas las reservas');
          console.log(this.allReservations);

          this.getReservationAvailable();
        } else {
          this.toast.error('No se ha podido recuperar los datos correctamente', 'Error');
        }
      });
  }

  fillCourts() {
    for (let i = 0; i < this.MAX_COURT; i++) {
      this.hours = [];

      for (let j = 10; j < 22; j++) {
        this.hours.push(j.toString() + ':00');
      }

      this.court.id = Number(i + 1);
      this.court.hours = this.hours;

      const copy = JSON.parse(JSON.stringify(this.court));

      this.allReservationsByCourtAvailable.push(copy); /*todas las horas están disponibles*/
    }
  }

  doReservation() {
    const dateFormat = new Date(this.mydate.date.year, this.mydate.date.month - 1, this.mydate.date.day);

    dateFormat.setHours(this.hourSelected.substring(0, 2));
    this.reservation.doReservation(this.courtSelected.id, dateFormat.getTime()).subscribe(
      response => {
        if (response) {
          this.getAllReservationsByLoggedUser();
          this.getAllReservations();
          this.selectHours(this.allReservationsByCourtAvailable[0]);
          this.toast.success('Se ha creado correctamente la reserva', 'Reserva');
        }
      }, error => {
        if (error.status === 400) {
          this.toast.error('Error en el envío de datos', 'Reserva');
        } else if (error === 401) {
          this.toast.error('Error en el token enviado', 'Reserva');
        } else if (error.status === 409) {
          this.toast.error('Error en el número máximo de reservas realizadas', 'Reserva');
        } else if (error.status === 500) {
          this.toast.error('Error en el servidor', 'Reserva');
        }
      });
  }

  getReservationAvailable() {
    this.hours = [];
    for (const reservation of this.allReservations) {

      if (reservation.courtId === 1) {
        const index = this.allReservationsByCourtAvailable[0].hours.indexOf(reservation.rsvtime);
        if (index !== -1) {
          this.allReservationsByCourtAvailable[0].hours.splice(index, 1);
          this.fillCourt(0, reservation.rsvtime);
        }
      } else if (reservation.courtId === 2) {
        const index = this.allReservationsByCourtAvailable[1].hours.indexOf(reservation.rsvtime);
        if (index !== -1) {
          this.allReservationsByCourtAvailable[1].hours.splice(index, 1);
          this.fillCourt(1, reservation.rsvtime);
        }
      } else if (reservation.courtId === 3) {
        const index = this.allReservationsByCourtAvailable[2].hours.indexOf(reservation.rsvtime);
        if (index !== -1) {
          this.allReservationsByCourtAvailable[2].hours.splice(index, 1);
          this.fillCourt(2, reservation.rsvtime);
        }
      } else if (reservation.courtId === 4) {
        const index = this.allReservationsByCourtAvailable[3].hours.indexOf(reservation.rsvtime);
        if (index !== -1) {
          this.allReservationsByCourtAvailable[3].hours.splice(index, 1);
          this.fillCourt(3, reservation.rsvtime);
        }
      }
    }
  }

  fillCourt(court: number, rsvtime: string) {
    const pista: any = {
      id: (court + 1),
      hours: []
    };

    if (this.allReservationsByCourtUnavailable &&
      this.allReservationsByCourtUnavailable[court] &&
      this.allReservationsByCourtUnavailable[court].hours) {
      const indexAux = this.allReservationsByCourtUnavailable[court].hours.indexOf(rsvtime);
      if (indexAux === -1) {
        this.allReservationsByCourtUnavailable[court].hours.push(rsvtime);
      }
    } else {
      pista.hours.push(rsvtime);
      this.allReservationsByCourtUnavailable.push(pista);
    }
  }

  isUnavailable(c: Court) {
    return c && c.hours && c.hours.length === 0;
  }

  isAvailable(c: Court) {
    return c && c.hours && c.hours.length > 0;
  }

  selectHours(pista) {
    this.courtSelected = this.allReservationsByCourtAvailable[pista - 1];
    /*if (this.courtSelected && this.courtSelected.hours) {
      this.selectHour(this.courtSelected.hours[0]);
    }*/
  }

  selectHour(hora) {
    this.hourSelected = hora;
  }

}

