import { Injectable,Input,Output,EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ParseResponsesService{

	  charObj:Object;
	  private endpoint:string;
	  private headers:Headers;
	  private options:RequestOptions;
	  private _http:Http;
      portraitUrl:string;


      //create custom events to pass the data along to applicable components
      @Output() charDataEvent: EventEmitter<any> = new EventEmitter();


	 constructor(private http:Http){
	  	this._http = http;


	 }

	 //Parse the public
	 parsePubData(res,_aToken){
	
	 //console.log(res)
	 	this.charObj = new Object();
	 	this.charObj["name"]=res.name;
 		this.charObj["description"]=res.description;
 		this.charObj["id"]=res.id_str;
 		this.charObj["portrait"]=res.portrait["256x256"]["href"];


 		this.portraitUrl=this.charObj["portrait"];

 		this.charObj["raceId"]=res.race.id;
 		this.charObj["bloodId"]=res.bloodLine.id;		
 		this.charObj["genderId"]=res.gender_str;
 		this.charObj["corpLogoUrl"]=res.corporation.logo["256x256"].href;
 		this.charObj["allianceName"]=res.corporation.name;


 		//Once this charData object is populated, emit the event to pass the data to the charInfo component who is listening
		


 		//We need to make secondary calls with other values to get more data

 		//location object call
		var thisUrl = "https://esi.tech.ccp.is/latest/characters/" + res.id_str + "/location/";	
 		this.makeEsiCalls(thisUrl, _aToken, "location");

 		//race json call
		var thisUrl = "https://crest-tq.eveonline.com/races/";	
 		this.makeEsiCalls(thisUrl, _aToken, "race");

 		//bloodlines json call
		var thisUrl = "https://crest-tq.eveonline.com/bloodlines/";	
 		this.makeEsiCalls(thisUrl, _aToken, "bloodlines");






 		
	 }


	private makeEsiCalls(_url:string,_aToken, _callName){

	  	this.headers = new Headers();
		this.headers.append('Content-Type',' application/json');
		this.headers.append('Authorization', 'Bearer '+ _aToken);
	 	this.options = new RequestOptions({ headers: this.headers });
	  	  

	  	this._http.get(_url,this.options).subscribe(
		      response => {
				var resJson = "";
				var locObj = new Object();

				switch(_callName){

	  				case "location":
	  					 this.charObj["locationObj"] = response.json();
	  					 //make call here for system and station data

	  					var thisUrl = "https://crest-tq.eveonline.com/stations/" + this.charObj["locationObj"]["station_id"] + "/";	
				 		this.makeEsiCalls(thisUrl, _aToken, "station");

	  					 
	  					break;

	  				case "race":
	  					var raceObj = response.json();
	  					this.charObj["raceName"] = raceObj["items"][this.charObj["raceId"]]["name"];
	  					this.charObj["raceLogoUrl"] = raceObj["items"][this.charObj["raceId"]]["icon"]["128x128"]["href"];
	  					break;

	  				case "bloodlines":
	  					var bloodObj = response.json();
						this.charObj["bloodName"] = bloodObj["items"][this.charObj["bloodId"]]["name"];
	  					this.charDataEvent.emit({
		      				value: this.charObj
		    			})
 
	  				
	  					break;

	  				
	  				case "station":
	  					var stationObj = response.json();
						this.charObj["station"] = stationObj["name"];
						this.charObj["system"] = stationObj["system"]["name"];
						
			
						
	  					
	  					
	  					break;


	  				default:
	  					break;


	  			}




		      },
		      err => console.log("ESI Call Error", _callName, err)
		);


	  		 

	}

	getCharObj(){


			return this.charObj

	}







}