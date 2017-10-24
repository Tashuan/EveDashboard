import { Component,EventEmitter,Output, ApplicationRef,NgZone } from '@angular/core';
import { GoogleChartComponent } from './google-chart/google-chart.component'
import { NgFor } from '@angular/common';

@Component({
  selector: 'recent-trans',
  templateUrl: './recentTrans.component.html',
  styleUrls: ['./recentTrans.component.scss'],
  providers: [GoogleChartComponent]
})
export class RecentTransComponent {

    private gc:GoogleChartComponent;
    private tableOptions = [];
    private tableData = [];
    private transObj = new Array();
    private ar:ApplicationRef;
    private zone:NgZone;
  
  @Output() gotWalletEvent: EventEmitter<any> = new EventEmitter();


    constructor(_gc:GoogleChartComponent, _ar:ApplicationRef,_zone:NgZone){
     	 this.gc = _gc;
       this.transObj = ["test","test","test3"]
       this.ar = _ar;
       this.zone = _zone;

    }

    ngOnInit(){


       



    }
      
   //This is being called from the Finance Component once it has parsed the wallet journal xml
    handleWalletJournalEvent(walletJrnJson){

         
       //Just going to use hardcoded data for now to prevent sign in

         
   

    }



    getRefType(refNumber){
      
      var thisRef = "";
        
        switch(refNumber){
          case "1":
            thisRef = "Player Trading";
            break;

          case "2":
            thisRef = "Market Transaction";
            break;

          case "10":
            thisRef = "Player Trading";
            break;

          case "17":
            thisRef = "Bounty Prize";
            break;

          case "19":
            thisRef = "Insurance";
            break;

          case "35":
            thisRef = "CSPA Spam Act";
            break;

          case "37":
            thisRef = "Corp Account Withdrawl";
            break;

          case "46":
            thisRef = "Broker Fee";
            break;

          case "50":
            thisRef = "Alliance Maintenance fee";
            break;

          case "56":
            thisRef = "Manufacturing";
            break;

          case "63":
          case "64":
          case "71":
          case "72":
          case "73":
          case "74":
          case "79":
          case "80":
          case "81":
          case "82":
            thisRef = "Contract";
            break;

          case "85":
            thisRef = "Bounty Prizes";
            break;

          case "96":
            thisRef = "Customs Office Import Duty";
            break;

          case "97":
            thisRef = "Customs Office Export Duty";
            break;

          default:
            thisRef = "Unknown";
            break;
        }

        return thisRef



    }

    private recentTransObj = [
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"3,942.07",
                  "tax":"2536.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"7,465.43",
                  "tax":"2,435.62",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"764,566.07",
                  "tax":"2,536.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-5-17",
                  "type":"Item Sale",
                  "amount":"1,456,745.67",
                  "tax":"86,544.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-5-17",
                  "type":"Item Sale",
                  "amount":"85,535.97",
                  "tax":"5,367.53",
                  "location":"Pator Tech School"
                },
                {"date":"1-5-17",
                  "type":"Item Purchase",
                  "amount":"84,764.83",
                  "tax":"2536.32",
                  "location":"Pator Tech School"
                },
                 {"date":"1-5-17",
                  "type":"Item Purchase",
                  "amount":"1,456,745.67",
                  "tax":"586,586.72",
                  "location":"Pator Tech School"
                },
                {"date":"1-9-17",
                  "type":"Item Sale",
                  "amount":"45,354.94",
                  "tax":"5,367.53",
                  "location":"Pator Tech School"
                },
                {"date":"1-9-17",
                  "type":"Item Purchase",
                  "amount":"2,586,764.83",
                  "tax":"3,345.56",
                  "location":"Pator Tech School"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"3,942.07",
                  "tax":"2536.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"7,465.43",
                  "tax":"2,435.62",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"764,566.07",
                  "tax":"2,536.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-5-17",
                  "type":"Item Sale",
                  "amount":"1,456,745.67",
                  "tax":"86,544.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-5-17",
                  "type":"Item Sale",
                  "amount":"85,535.97",
                  "tax":"5,367.53",
                  "location":"Pator Tech School"
                },
                {"date":"1-5-17",
                  "type":"Item Purchase",
                  "amount":"84,764.83",
                  "tax":"2536.32",
                  "location":"Pator Tech School"
                },
                 {"date":"1-5-17",
                  "type":"Item Purchase",
                  "amount":"1,456,745.67",
                  "tax":"586,586.72",
                  "location":"Pator Tech School"
                },
                {"date":"1-9-17",
                  "type":"Item Sale",
                  "amount":"45,354.94",
                  "tax":"5,367.53",
                  "location":"Pator Tech School"
                },
                {"date":"1-9-17",
                  "type":"Item Purchase",
                  "amount":"2,586,764.83",
                  "tax":"3,345.56",
                  "location":"Pator Tech School"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"3,942.07",
                  "tax":"2536.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"7,465.43",
                  "tax":"2,435.62",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-3-17",
                  "type":"Item Sale",
                  "amount":"764,566.07",
                  "tax":"2,536.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-5-17",
                  "type":"Item Sale",
                  "amount":"1,456,745.67",
                  "tax":"86,544.32",
                  "location":"Elgoi Trade Hub"
                },
                {"date":"1-5-17",
                  "type":"Item Sale",
                  "amount":"85,535.97",
                  "tax":"5,367.53",
                  "location":"Pator Tech School"
                },
                {"date":"1-5-17",
                  "type":"Item Purchase",
                  "amount":"84,764.83",
                  "tax":"2536.32",
                  "location":"Pator Tech School"
                },
                 {"date":"1-5-17",
                  "type":"Item Purchase",
                  "amount":"1,456,745.67",
                  "tax":"586,586.72",
                  "location":"Pator Tech School"
                },
                {"date":"1-9-17",
                  "type":"Item Sale",
                  "amount":"45,354.94",
                  "tax":"5,367.53",
                  "location":"Pator Tech School"
                },
                {"date":"1-9-17",
                  "type":"Item Purchase",
                  "amount":"2,586,764.83",
                  "tax":"3,345.56",
                  "location":"Pator Tech School"
                },
             
    ]












}