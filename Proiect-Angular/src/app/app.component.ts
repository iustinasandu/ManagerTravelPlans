import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {  OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Proiect-Angular';
  constructor() { }

  ngOnInit() {
    
  }
}
