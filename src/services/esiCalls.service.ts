import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Injectable,EventEmitter,Output } from '@angular/core';
import 'rxjs/add/operator/map';
import {ParseResponsesService} from '../services/parseResponses.service'

@Injectable()
export class EsiCallsService{

	 private _http:Http;
	 private charDataObj:Object = new Object();
	 private endpoint:string;
	 private headers:Headers;
	 private options:RequestOptions;
	 private _pr:ParseResponsesService;

	 @Output() accountBalEvent: EventEmitter<any> = new EventEmitter();
	 @Output() walletJournalEvent: EventEmitter<any> = new EventEmitter();;

	 constructor(private http: Http, private pr:ParseResponsesService){
	  	//console.log('esi call services initalized....');
	  	this._http = http;
	  	this._pr = pr;
	

	 }

	 callList(_charId:string, _aToken:string){

	  	//Character Public Data and Endpoints
	 	this.endpoint = "https://crest-tq.eveonline.com/" + 'characters/'+ _charId + "/";
	 	this.makeEsiCalls(this.endpoint,this.options, _aToken, "charPublicData");

	 	//Character Sheet - Access Mask not granted need to add proper access
	 	//this.endpoint = "https://api.eveonline.com/char/CharacterSheet.xml.aspx?characterID="+_charId+"&accessToken="+_aToken;
	 	//this.makeXmlCalls(this.endpoint, "characterSheet");

		

		//Character Wallet Balance
	 	this.endpoint = "https://api.eveonline.com/char/AccountBalance.xml.aspx?characterID="+_charId+"&accessToken="+_aToken;
	 	this.makeXmlCalls(this.endpoint, "accountBalance");

		//Character Wallet Transactions
	 	this.endpoint = "https://api.eveonline.com/char/WalletTransactions.xml.aspx?characterID="+_charId+"&accessToken="+_aToken;
	 	//this.makeXmlCalls(this.endpoint, "walletTransactions");

		//Character Wallet Journal
	 	this.endpoint = "https://api.eveonline.com/char/WalletJournal.xml.aspx?characterID="+_charId+"&accessToken="+_aToken;
	 	this.makeXmlCalls(this.endpoint, "walletJournal");

	



	 }


	  private makeEsiCalls(_url:string, _options, _aToken, _callName){

	  	this.headers = new Headers();
		
		this.headers.append('Content-Type',' application/json');
		this.headers.append('Authorization', 'Bearer '+ _aToken);
	 	this.options = new RequestOptions({ headers: this.headers });
	  	  

	  	this._http.get(_url, _options).map(response => response.json()).subscribe(
		      response => this.handleEsi(response,_callName,_aToken),
		      err => console.log("ESI Call Error", _callName, err) 
		);

	  		 

	  }


	  private makeXmlCalls(_url:string, _callName:string){

	  	this.headers = new Headers();
		this.headers.append('Accept', 'application/xml');
	 	this.options = new RequestOptions({ headers: this.headers });

		//Make xml calls for enpoints not ready in ESI 
   		this._http.get(_url, this.options).subscribe(
		   	 res => this.handleXml(res,_callName), 
		   	 err => console.log("XML Call Error: ", _callName, err));
	    }


	  handleXml(_response,_callName){

	  		switch(_callName){

	  			case "characterSheet":
  					//console.log("characterSheet: ",_response.text());
  					break;

  				case "accountBalance":
  					
  						this.accountBalEvent.emit({
		      				value: _response.text()
		    			})
 
  					break;

  				case "walletJournal":
  					//console.log("walletJournal: ",_response.text());
  					this.walletJournalEvent.emit({
		      				value: _response.text()
		    			})
  					break;

  				case "walletTransactions":
  					console.log("walletTransactions: ",_response.text());
  					break;

  				

  				default:
  					break;


	  		}


	  }

	   handleEsi(_response,_callName,_aToken){

			switch(_callName){

  				case "charPublicData":
  					this._pr.parsePubData(_response,_aToken);
  					break;

  				default:
  					break;


	  		}



	  	}


	  refreshAcctBal(_charId,_aToken){
		//Character Wallet Balance
	 	this.endpoint = "https://api.eveonline.com/char/AccountBalance.xml.aspx?characterID="+_charId+"&accessToken="+_aToken;
	 	this.makeXmlCalls(this.endpoint, "accountBalance");
	  }





	}