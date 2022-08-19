import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {
    this.route.paramMap.subscribe(params => {
      let number = parseInt(params.get("number") as string);
      if (number >= 1 && number <= 12) {
        setTimeout(() => {
          this.appService.setMonthNumber(number);
        }, 100);
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
  
  ngOnInit(): void {
  }

}
