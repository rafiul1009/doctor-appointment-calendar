import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  months = [
    {
      value: 1,
      label: "January"
    },
    {
      value: 2,
      label: "February"
    },
    {
      value: 3,
      label: "March"
    },
    {
      value: 4,
      label: "April"
    },
    {
      value: 5,
      label: "May"
    },
    {
      value: 6,
      label: "June"
    },
    {
      value: 7,
      label: "July"
    },
    {
      value: 8,
      label: "August"
    },
    {
      value: 9,
      label: "September"
    },
    {
      value: 10,
      label: "October"
    },
    {
      value: 11,
      label: "November"
    },
    {
      value: 12,
      label: "December"
    }
  ];

  currentMonthNumber = 1;
  currentMonthName = "";
  currentYear = 2022;

  constructor(
    private router: Router,
    private appService: AppService,
    public dialog: MatDialog
  ) {
    if (localStorage.getItem("appointmentList")) {
      let appointmentList = JSON.parse(localStorage.getItem("appointmentList") as string);
      setTimeout(() => {
        this.appService.setAppointmentList(appointmentList);
      }, 100);
    }
  }

  ngOnInit(): void {
    this.appService.currentMonthNumber.subscribe((value: any) => {
      let month = this.months.find(month => month.value == value);
      if (month) {
        this.currentMonthName = month.label;
        this.currentMonthNumber = value;
        const date = new Date();
        this.currentYear = date.getFullYear();
      }
    });
  }


  handleSelectMonth(number: number) {
    this.router.navigateByUrl('month/' + number);
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

  openAppointmentDialog() {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      width: '640px', disableClose: true
    });
  }
}
