import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable,EventEmitter,Output } from '@angular/core';
import 'rxjs/add/operator/map';




@Injectable()
export class FinanceService{

	private todaysProfit = 0;
	private monthsProfit = 0;
	private yearsProfit = 0;
	private todaysLoss = 0;
	private monthsLoss = 0;
	private yearsLoss = 0;
	private profitObj:Object;
	private todayDate:Date;
	private todObj:Object;
	private thisMonth:string;
	private thisDay:string;
	private thisYear:string;
		

	
	@Output() journalDataEvent: EventEmitter<any> = new EventEmitter();
 	@Output() profitsEvent: EventEmitter<any> = new EventEmitter();
	 
	 constructor(){
	 }

	
	 parseWalletJournal(wjObj){

	 	//Get today's date vars so we can compare to journal entries for sorting and calculations etc.
	 	this.todayDate = new Date();
		this.todObj = this.todayDate.toLocaleDateString().split("/")
		this.thisMonth = this.todObj[0];
		this.thisDay = this.todObj[1];
		this.thisYear = "2016";//this.todObj[3];



	 	this.calcTodayProfit(wjObj);



	 	
	 	      // this.walletObs.subscribe(value => console.log('****',value))



	 		

	 }

	calcTodayProfit(wjObj){

			for(var i=0;i<wjObj["row"].length;i++){



	 			var currDate = wjObj["row"][i]["@attributes"].date;
	 			var currDateObj = currDate.split(" ")[0].split("-");
	 			var currMonth = currDateObj[1];
	 			var currDay = currDateObj[2];
	 			var currYear = currDateObj[0];

	
 				//TODAYS P/L
	 			if(parseInt(this.thisDay) == parseInt(currDay) && parseInt(this.thisMonth) == parseInt(currMonth) && parseInt(this.thisYear) == parseInt(currYear)){

	 					if (parseFloat(wjObj["row"][i]["@attributes"].amount) > 0){
	 							this.todaysProfit += parseFloat(wjObj["row"][i]["@attributes"].amount);
	 						}
	 					//If its a negative number, add to losses
	 					else{
	 						this.todaysLoss += parseFloat(wjObj["row"][i]["@attributes"].amount);
	 					}
	 			}

	 			//THIS MONTHS P/L
	 			if(parseInt(this.thisMonth) == parseInt(currMonth) && parseInt(this.thisYear) == parseInt(currYear)){

	 					if (parseFloat(wjObj["row"][i]["@attributes"].amount) > 0){
	 							this.monthsProfit += parseFloat(wjObj["row"][i]["@attributes"].amount);
	 						}
	 					//If its a negative number, add to losses
	 					else{
	 						this.monthsLoss += parseFloat(wjObj["row"][i]["@attributes"].amount);
	 					}
	 			}

	 			//THIS YEARS P/L
	 			if(parseInt(this.thisYear) == parseInt(currYear)){

	 					if (parseFloat(wjObj["row"][i]["@attributes"].amount) > 0){
	 							this.yearsProfit += parseFloat(wjObj["row"][i]["@attributes"].amount);
	 						}
	 					//If its a negative number, add to losses
	 					else{
	 						this.yearsLoss += parseFloat(wjObj["row"][i]["@attributes"].amount);
	 					}
	 			}







	 	}

	 	this.profitObj = new Object();
	 	this.profitObj["todaysProfit"] = this.todaysProfit;
	 	this.profitObj["todaysLoss"] = this.todaysLoss;
	 	this.profitObj["monthsProfit"] = this.monthsProfit;
	 	this.profitObj["monthsLoss"] = this.monthsLoss;
	 	this.profitObj["yearsProfit"] = this.yearsProfit;
	 	this.profitObj["yearsLoss"] = this.yearsLoss;

	 	this.profitsEvent.emit({
		      				value: this.profitObj
		})



		//emit the entire journal in event so charts can parse data
		this.journalDataEvent.emit({
		      				value: wjObj
		})


	 	


	}












	}