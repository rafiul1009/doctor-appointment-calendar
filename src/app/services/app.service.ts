import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private monthNumber = new Subject<number>();
  currentMonthNumber = this.monthNumber.asObservable();

  private appointmentList = new Subject<any[]>();
  currentAppointmentList = this.appointmentList.asObservable();

  constructor() { }

  public setMonthNumber(number: number) {
    this.monthNumber.next(number);
  }

  public setAppointmentList(list: any[]) {
    this.appointmentList.next(list);
  }
}
