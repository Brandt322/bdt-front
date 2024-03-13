import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userData!: User;

  constructor() { }

  ngOnInit(): void {
    this.userData
  }

}
