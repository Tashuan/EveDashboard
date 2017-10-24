import { Component,EventEmitter,Output } from '@angular/core';
import {EsiCallsService} from '../services/esiCalls.service'
import {FinanceService} from '../services/finance.service'
import {RecentTransComponent} from './recentTrans.component'

@Component({
  selector: 'finances',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  providers: [FinanceService,RecentTransComponent]
})
export class FinanceComponent {

  _esi:EsiCallsService;
  _fs:FinanceService;
  _rt:RecentTransComponent;
  private todaysProfit;
  private todaysLoss:Number;
  private monthsProfit:Number;
  private monthsLoss:Number;
  private yearsLoss:Number;
  private yearsProfit:Number;
   private currBal:string;
    xmlData;

  constructor(private esi:EsiCallsService, fs:FinanceService, rt:RecentTransComponent){
   	 
      this._esi = esi;
      this._fs = fs;
      this._rt = rt;

       this.todaysProfit = this.formatCurr(526402.29);
       this.todaysLoss = this.formatCurr(492772.21);
       this.monthsProfit = this.formatCurr(295526724.02);
       this.monthsLoss = this.formatCurr(204627734.93);
       this.yearsLoss = this.formatCurr(504692839.73);
       this.yearsProfit = this.formatCurr(951738075.94);
       this.currBal = this.formatCurr(2643746374.03);

  }

  ngOnInit(){

    this._esi.accountBalEvent.subscribe(value => this.handleAcctBalEvent(value));
    this._esi.walletJournalEvent.subscribe(value => this.handleWalletJournalEvent(value));
    this._fs.profitsEvent.subscribe(value => this.handleTodaysProfitEvent(value));
     
    
    }




    handleAcctBalEvent(xml){
        ///var xmlObj;
        var parser = new DOMParser();
        this.xmlData = parser.parseFromString(xml["value"],"text/xml");
        var resultNode = this.xmlData.getElementsByTagName("row")[0];
        var bal = parseFloat(resultNode.getAttribute("balance"));

        this.currBal = this.formatCurr(bal) + " isk";
        
    }

    handleWalletJournalEvent(xml){
        var parser = new DOMParser();
        this.xmlData = parser.parseFromString(xml["value"],"text/xml");
        var wallJournalXml = <HTMLInputElement>this.xmlData.getElementsByTagName("result")[0].childNodes[1];


        var wallJournalJson = this.xmlToJson(wallJournalXml)

        //We have the wallet journal json, lets send it to the service to parse the data
        this._fs.parseWalletJournal(wallJournalJson);

        //Lets also send this data to the chart and recentTrans components now
        this._rt.handleWalletJournalEvent(wallJournalJson);


    }


      handleTodaysProfitEvent(_profit){

          this.todaysProfit = this.formatCurr(_profit.value["todaysProfit"]);
          this.todaysLoss = this.formatCurr(_profit.value["todaysLoss"]);
          this.monthsProfit = this.formatCurr(_profit.value["monthsProfit"]);
          this.monthsLoss = this.formatCurr(_profit.value["monthsLoss"]);
          this.yearsProfit = this.formatCurr(_profit.value["yearsProfit"]);
          this.yearsLoss = this.formatCurr(_profit.value["yearsLoss"]);
      }






    //Format a number to currency
    formatCurr(n) {
    return n.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });



}

  //This code converts the xml to json thanks to David Walsh
  
  xmlToJson(xml) {
  
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = this.xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(this.xmlToJson(item));
      }
    }
  }
  return obj;
};
















}