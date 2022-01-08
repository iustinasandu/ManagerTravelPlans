import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { } from 'googlemaps';
declare var google: any;

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit, AfterViewInit  {

  buton: FormGroup;

  constructor(private http: HttpClient, private formBuilderButon1: FormBuilder) { 
    this.buton = this.formBuilderButon1.group({
      name: ''
    });
  }

  ngOnInit() {
  }

  onClickButon1() {
    this.showTravelPlan(this.buton.value.name);

}
  
  users: any;
  
  travelPlans:any;

  originP:any;
  destinationP:any;

  empList: Array<{ Origin: string, Destination: string,TravelId: number, userName:string }> = [];
  markers: Array<{ latitude: number, logitude: number }> = [];

  showTravelPlan(id: any)
  {
    this.empList.forEach((obj: any) => {
      if(obj.TravelId==id)
      {
        this.originP=obj.Origin;
        this.destinationP=obj.Destination;
      }
      
    })


    this.mapDir = new google.maps.Map(this.mapDirectionElement.nativeElement, {
      center: { lat: 44.439663, lng: 26.096306 },
      zoom: 8
    }); 

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.mapDir
    });

    var request = google.maps.DirectionsRequest = {
      destination: this.destinationP,
      origin: this.originP,
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function(response:any, status:any) {
      
      if (status == google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        console.log("response : " + response.geocoded_waypoints.map((f: { place_id: any; }) => f.place_id))
        directionsDisplay.setDirections(response);        
      } else { console.log("not OK !" + status)}
    });
  }


  getUsers() {
    this.http.get('http://localhost:8080/api/sequelize/users').subscribe(response => {
      this.users = response;
      this.getEveryTravelPlan();
    }, error => {
      console.log(error);
    });

    this.mapDir = new google.maps.Map(this.mapDirectionElement.nativeElement, {
      center: { lat: 44.439663, lng: 26.096306 },
      zoom: 8
    }); 

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.mapDir
    });

    // Set destination, origin and travel mode.
    var request = google.maps.DirectionsRequest = {
      destination: 'iasi',
      origin: "cluj",
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function(response:any, status:any) {
      console.log("Status:" + status)
      if (status == google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        console.log("response : " + response.geocoded_waypoints.map((f: { place_id: any; }) => f.place_id))
        directionsDisplay.setDirections(response);        
      } else { console.log("not OK !" + status)}
    });


  }

  getEveryTravelPlan() {
    this.users.forEach((item: any) => {
      this.getTravelPlans(item.UserId, item.Name);
    });
  }

  getTravelPlans(identif: any, numeUser: any) {
    let urlpostTravelPlans = "http://localhost:8080/api/sequelize/users/:userId/travel_plans";
    urlpostTravelPlans = urlpostTravelPlans.replace(':userId', identif);
    this.http.get(urlpostTravelPlans, {
    }).subscribe(response => {
      this.travelPlans = response;
      this.addTravelPlanInList(numeUser);
    }, error => {
      console.log(error);
    });
  }

  addTravelPlanInList(userN: any) {
    this.travelPlans.forEach((obj: any) => {
      this.empList.push({ Origin: obj.Origin, Destination: obj.Destination, TravelId: obj.TravelId, userName:userN});
 })};


 mapDir: any;
 @ViewChild('mapDirection') mapDirectionElement: any;

 ngAfterViewInit(): void {
  this.getUsers();
 }

}
