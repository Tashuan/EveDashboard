import { Component } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { EsiCallsService} from '../services/esiCalls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, EsiCallsService]
})
export class AppComponent {
  private title = 'Eve Dashboard';
  private id:string;
  private charName:string;
  private aToken:string;
  private rToken:string;
  private _authService:AuthService;
  private newCharData:string;
  isVis = "none";
  private isUrlHash:boolean = false;
  private _esiCalls:EsiCallsService;
  private charData;
  
  constructor(authService : AuthService, esiCalls : EsiCallsService){
   	
   	this._authService = authService;
   	this._esiCalls = esiCalls;

  }

  ngOnInit(){

		console.log('app initialized...');

		//Check for character data in local storage to get stored data and token. If it doesnt exist,
		//Begin the Auth Flow
		
		//remove char storage data
		localStorage.removeItem('eveDashCharacters');
		
    //UNCOMMENT THIS TO PULL IN REAL DATA
		//this.checkLocalStor();

  }

  checkLocalStor(){

  		var charJson = '{"character": {"id": "9048203","name": "Zkitz SouthWard","aToken": "2094024298492800924","rToken": "skfjklsajflakjfsakfj"}}'
	

  		if(localStorage.getItem("eveDashCharacters")){
			
			//We have at least one character saved locally, 
			//so pull the auth vars to send to service to make calls

  			var thisCharJson = JSON.parse(localStorage.getItem("eveDashCharacters"), (key, value) => {
  				//console.log(key, value);

  				switch(key){
  					case "id": 
  						this.id = value;
  						break;
  					case "name":
  						this.charName = value;
  						break;
  					case "aToken":
  						this.aToken = value;
  						break;
  					case "rToken":
  						this.rToken = value;
  						break;		
  				}
			});

			//Now we have the values we need to make HTTP calls, 
			//so pass thes vars to the auth services to make calls



			//this.newCharData = this._authService.authLogin();



  		} else {

  			//Check here to see if there's an auth Token available in URL hash in case its in step 2 of Auth flow

			var hash = window.location.hash;
        	this.aToken = this.extractFromHash("access_token", hash);

        	if(this.aToken){

				console.log('token hash found...');
				this.isUrlHash=true;

				//We got the token in the url hash, so Auth has been given. Now verify to get acess token and refresh tokens
				//Skipping this part for now, there's a interuption in the flow where we dont get back refresh token right now 
				//because were using the token response type in the button click call
				
				//this._authService.verfiyAuth();

				//use the auth token to make char id call	and start the data call chain
        		this._authService.charIdCall(this.aToken);





        	} else {

	  			//There was no character data found locally, and no token in url hash, so they should already see the login button, to send them to the 
	  			//auth login screen, and get back character data to store locally, THEN pass to make calls.

				  this.isUrlHash=false;
	    		this.isVis = "block";
	  			this.newCharData = this._authService.authLogin();

  			}

  			//localStorage.setItem("eveDashCharacters",charJson);
  			
  		}

  }



   // Extract value from oauth formatted hash fragment.
   extractFromHash(name, hash) {
        var match = hash.match(new RegExp(name + "=([^&]+)"));
        return !!match && match[1];
    }


	//When app html template is initiated the login button style will call 
	//this function to determine if it should be visible
  
  showLoginBtn():string{

  	var loginBtnVis = "none";

	if(!localStorage.getItem("eveDashCharacters") && !this.isUrlHash){

		loginBtnVis = "block";

	} else {

  		//console.log(localStorage.getItem("eveDashCharacters"))
	}

	return loginBtnVis;

  }


 
	 







}