import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Day } from 'src/app/models/day.model';
import { AppService } from 'src/app/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDetailsModalComponent } from '../appointment-details-modal/appointment-details-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public appointmentList: any[] = [];
  public weekDaysName = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  public monthDays: Day[] = [];
  private currentYear: number;
  private currentMonthIndex: number = 0;

  constructor(
    private appService: AppService,
    public dialog: MatDialog
  ) {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }

  ngOnInit(): void {
    this.appService.currentAppointmentList.subscribe((value: any) => {
      this.appointmentList = value;
      this.monthDays = this.getMonth(this.currentMonthIndex, this.currentYear);
    });
    this.appService.currentMonthNumber.subscribe((value: any) => {
      this.currentMonthIndex = parseInt(value) - 1;
      this.monthDays = this.getMonth(this.currentMonthIndex, this.currentYear);
    });
  }

  public getMonth(monthIndex: number, year: number): Day[] {
    let days = [];

    let firstday = this.createDay(1, monthIndex, year);

    for (let i = 1; i < firstday.weekDayNumber; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex: monthIndex,
        year: year,
      } as Day);
    }

    days.push(firstday);

    let countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 2; i < countDaysInMonth + 1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    let remainingDays = 42 - days.length;
    for (let i = 0; i < remainingDays; i++) {
      days.push({
        weekDayNumber: i,
        monthIndex: monthIndex,
        year: year,
      } as Day);
    }

    return days;
  }

  public getMonthName(monthIndex: number): string {
    switch (monthIndex) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";

      default:
        return "monthIndex: " + monthIndex;
    }
  }

  public getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";

      default:
        return "";
    }
  }

  private createDay(dayNumber: number, monthIndex: number, year: number) {
    const date = new Date(year, monthIndex, dayNumber);
    const weekDayNumber = date.getDay();
    const formatedDate = moment(date).format("YYYY-MM-DD");

    return new Day(
      dayNumber,
      year,
      this.getMonthName(monthIndex),
      monthIndex,
      this.getWeekDayName(weekDayNumber),
      weekDayNumber + 1,
      this.getEvents(formatedDate)
    );
  }

  private getEvents(date: string): any {
    if (this.appointmentList && this.appointmentList.length > 0) {
      let events = this.appointmentList.filter(event => event.date == date);
      let eventsSorted = events.sort((a, b) => (new Date(b.date + " " + b.time)) < (new Date(a.date + " " + a.time)) ? 1 : -1);
      return eventsSorted;
    } else {
      if (localStorage.getItem("appointmentList")) {
        let appointmentList = JSON.parse(localStorage.getItem("appointmentList") as string);
        let events = appointmentList.filter((event: any) => event.date == date);
        let eventsSorted = events.sort((a: any, b: any) => (new Date(b.date + " " + b.time)) < (new Date(a.date + " " + a.time)) ? 1 : -1);
        return eventsSorted;
      } else {
        return [];
      }
    }
  }

  public showEventModal(event: any) {
    const dialogRef = this.dialog.open(AppointmentDetailsModalComponent, {
      width: '300px',
      data: event,
    });
  }

}
