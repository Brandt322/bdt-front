import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { LoaderService } from './core/global/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    initFlowbite();

    this.loader.showLoader();
    setTimeout(() => {
      this.loader.hideLoader();
    }, 3000)
  }
}
