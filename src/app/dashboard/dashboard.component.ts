import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  title: string = 'dashboard';

  constructor(
    private route: Router,
    private cdref: ChangeDetectorRef
    ) {}

  setHeader() {
    let path = this.route.url.split('/')[2];
    this.title = decodeURIComponent(path);
    this.cdref.detectChanges();
  }
}
