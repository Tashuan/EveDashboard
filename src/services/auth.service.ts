import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { EsiCallsService} from '../services/esiCalls.service';




@Injectable()
export class AuthService{

	  private baseUrl: string = 'https://esi.tech.ccp.is/latest/characters/93011126/skills/?datasource=tranquility';
      private redirectUri = "%0Alocalhost%3A4200%2F";
	  private aToken:string;
	  private clientId: string = '5168b914cfef48afa0a66f41f4aff3e7';
	  private scopes = "publicData characterSkillsRead characterWalletRead esi-skills.read_skills.v1";
	  private csrfToken: string;
	  private _http:Http;
	  private newCharData:string;
	  private xmlString:string;
	  private xmlData:Document;
	  private resultRow:HTMLInputElement;
	  characterID:string;
	  characterName:string;

	  private _esiCalls:EsiCallsService;


	  constructor(private http: Http, private esiCalls:EsiCallsService){
	  	console.log('auth services initalized....');
	  	
	  	this._http = http;
	 	this._esiCalls = esiCalls;
	  

	   
	  }


	//Send to login screen
	authLogin(){
 		
		window.open('https://login.eveonline.com/oauth/authorize/?response_type=token&redirect_uri=http://localhost:4200/&client_id=5168b914cfef48afa0a66f41f4aff3e7&scope=publicData characterSkillsRead characterWalletRead esi-location.read_location.v1  esi-skills.read_skills.v1&state=uniquestate12345','_self');
		return "complete"

	 }


	
	uuidGen() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

   

	charIdCall(aToken){
		this.aToken = aToken;
		//First call must be to XML API to get character ID to use with CREST API calls

		var thisBaseUrl = 'https://api.eveonline.com/account/APIKeyInfo.xml.aspx?accessToken='+aToken;


//https://api.eveonline.com/account/APIKeyInfo.xml.aspx?accessToken=rJOOduylJn7JrvKzAQa6hgoBDxHmcj5-UPOTSZ0IMHAHPahw6htgfAxa9a_2bKjQmY5lsOwdeV5Q43hZCf3OSw2

		  var headers = new Headers();
		  headers.append('Accept', 'application/xml');
		  //headers.append('Content-Type',' application/json');
		  //headers.append('Authorization', 'Bearer '+ "_aToken");

		  let options = new RequestOptions({ headers: headers });


		  //Make inital call to get character ID, create character json object and store it locally
		  this._http.get(thisBaseUrl, options).subscribe(
		   	 res =>this.getXml(res.text()), 
		   	 err => this.handleErr(err));



	}

	private handleErr(error){
		//If there's an error, the token is expired, lets just redirect to get a new token until we implement refresh token
		if(error.statusText=="Forbidden"){
			this.authLogin();
		}
	}

	getXml(xml){
		//Store character ID and Name, store character locally, then proceed to make CREST Calls
		
		//convert this xml string to real XML using the browser and get values
		var xmlObj;
		var parser = new DOMParser();
        this.xmlData = parser.parseFromString(xml,"text/xml");
     	var resultNode = this.xmlData.getElementsByTagName("result")[0];
      	this.resultRow = <HTMLInputElement>resultNode.getElementsByTagName("key")[0].childNodes[1].childNodes[1];

      	this.characterID = this.resultRow.getAttribute("characterID");
		this.characterName = this.resultRow.getAttribute("characterName");





		//We have the character's ID  and Auth Token, start the call chain

		this._esiCalls.callList(this.characterID, this.aToken);


	}

	//Weve been redirected back after auth login, get hash auth token and verify to get back Access token and Refresh token. Skipping this for now
	verifyAuth(){
		//make post call here from this link...
 		//https://eveonline-third-party-documentation.readthedocs.io/en/latest/sso/authentication.html

	}












}
