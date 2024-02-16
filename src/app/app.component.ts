import { Component, HostListener, OnInit } from '@angular/core';
import { initDropdowns, initFlowbite, initModals } from 'flowbite';
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
    initModals();
    initDropdowns();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    window.scrollTo(0, 0);
  }
}
