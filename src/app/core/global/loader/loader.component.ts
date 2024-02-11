import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderComponent {

  constructor(public loader: LoaderService) { }

}
