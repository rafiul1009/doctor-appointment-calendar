import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-details-modal',
  templateUrl: './appointment-details-modal.component.html',
  styleUrls: ['./appointment-details-modal.component.css']
})
export class AppointmentDetailsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppointmentDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
