import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  protected showBanner: boolean = false;

  ngOnInit(): void {
    const acceptedBanner = localStorage.getItem('banner');
    const loginToken = localStorage.getItem('token');
    if (!acceptedBanner && !loginToken) {
      this.showBanner = true;
    }
  }

  closeBanner(): void {
    this.showBanner = !this.showBanner;
    localStorage.setItem('banner', 'accepted');
    console.log("Show banner: ", this.showBanner);
  }
}
