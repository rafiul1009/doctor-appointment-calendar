import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  public createAppointmentForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl('male'),
    age: new FormControl(""),
    date: new FormControl(''),
    time: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private appService: AppService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateAppointmentComponent>
  ) { }

  public ngOnInit(): void {
    this.createAppointmentForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.maxLength(40)]],
      lastname: ["", [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*'), Validators.maxLength(40)]],
      email: ["", [Validators.required, Validators.email]],
      gender: ["male"],
      age: ["", [Validators.min(1), Validators.pattern('^[0-9]*$')]],
      date: ["", [Validators.required]],
      time: ["", [Validators.required]],
    });
  }

  public saveAppointment(): void {
    if (this.createAppointmentForm && this.createAppointmentForm.status == "VALID") {
      let formData = this.createAppointmentForm.value;
      const date = moment(formData.date).format("YYYY-MM-DD");
      const time = moment(formData.time).format("hh:mm A");
      formData.date = date;
      formData.time = time;
      formData.age = this.createAppointmentForm.value.age ? parseInt(this.createAppointmentForm.value.age) : null;

      if (localStorage.getItem("appointmentList")) {
        let appointmentList = JSON.parse(localStorage.getItem("appointmentList") as string);
        formData.id = appointmentList.length + 1;
        appointmentList.push(formData);
        localStorage.setItem("appointmentList", JSON.stringify(appointmentList));
        this.appService.setAppointmentList(appointmentList);
      } else {
        formData.id = 1;
        localStorage.setItem("appointmentList", JSON.stringify([formData]));
        this.appService.setAppointmentList([formData]);
      }
      this.toastrService.success('Appointment Created Successfully', 'Appointment');
      this.dialogRef.close();
    } else {
      return;
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
