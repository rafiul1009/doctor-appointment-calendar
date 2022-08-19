import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from 'mat-timepicker';
import { HomeComponent } from './pages/home/home.component';
import { MonthComponent } from './pages/month/month.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { AppointmentDetailsModalComponent } from './components/appointment-details-modal/appointment-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonthComponent,
    CalendarComponent,
    CreateAppointmentComponent,
    AppointmentDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatGridListModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTimepickerModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000, 
      progressBar: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
