import { Component,EventEmitter,Output } from '@angular/core';
import {ParseResponsesService} from '../services/parseResponses.service'



@Component({
  selector: 'char-info',
  templateUrl: './charInfo.component.html',
  styleUrls: ['./charInfo.component.scss'],
  providers: []
})
export class CharInfoComponent {

  private _pr:ParseResponsesService;
  private portraitUrl:string;
  private corpLogoUrl:string;
  private charName:string;
  private raceLogoUrl:string;
  private raceName:string;
  private bloodName:string;
  private allianceName:string;
  private gender:string;
  private system:string;
  private station:string;
  private bio:string;

  constructor(private pr:ParseResponsesService){
   	 
      this._pr = pr;
      this.portraitUrl = "http://imageserver.eveonline.com/Character/93011126_512.jpg";
      this.corpLogoUrl = "http://imageserver.eveonline.com/Corporation/1000172_128.png";
      this.raceLogoUrl = "http://imageserver.eveonline.com//Alliance/500002_128.png";
      this.charName = "Zkitz Southward";
      this.raceName = "Minmitar";
      this.bloodName = "Amarr";
      this.gender = "Male";
      this.allianceName = "Pator Tech School";
      this.system = "Metropolis";
      this.station = "Hek IV - Moon 12 Station";
      this.bio = "A humble explorer and miner, but don't get too close or I will release my super drones!"
  }

  ngOnInit(){


    //Here is where we are listening for the charDataEvent being emitted from the prService. UNCOMMENT THIS TO USE REAL DATA

	  //this._pr.charDataEvent.subscribe(value => this.handleDataEvent(value));



  }


  handleDataEvent(_value){
    

      var portUrl =  _value.value.portrait;
      var port512 = portUrl.replace("256","512");

      //set char name
      this.charName = _value.value.name;


      //here we get the data we need to update the template
      this.portraitUrl = port512;
      this.corpLogoUrl = _value.value.corpLogoUrl;
      this.bio = _value.value.description;
      if(this.bio == ""){ this.bio = "No Bio Description Available." }
      this.raceName = _value.value.raceName;
      this.raceLogoUrl = _value.value.raceLogoUrl;
      this.bloodName = _value.value.bloodName;
      this.allianceName = _value.value.allianceName;
      this.system = _value.value.system;
      this.station = _value.value.station;

      if(_value.value.genderId == "1"){
          this.gender = "Male";
      } else {
          this.gender = "Female";
      }
     

  }

 
	 







}