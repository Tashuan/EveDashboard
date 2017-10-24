import { Component,EventEmitter } from '@angular/core';
import {EsiCallsService} from '../services/esiCalls.service';
import {ProfitChartService} from '../services/profitChart.service';
import { GoogleChartComponent } from './google-chart/google-chart.component'


@Component({
  selector: 'profit-chart',
  templateUrl: './profitChart.component.html',
  styleUrls: ['./profitChart.component.scss'],
  providers: [EsiCallsService, ProfitChartService, GoogleChartComponent, ProfitChartComponent]
})


export class ProfitChartComponent {


  private _esiCalls:EsiCallsService;
  private _pc:ProfitChartService;
  private _gc:GoogleChartComponent;
  private chartH;

 




  constructor(private pc:ProfitChartService, private esiCalls:EsiCallsService, gc:GoogleChartComponent){
   	 
      this._pc = pc;
      this._esiCalls = esiCalls;
      this._gc = gc;
 

          //For some unknown reason this event subscription is not working although this component is identical to others that work so for now just using fake numbers
      //this._esiCalls.walletJournalEvent.subscribe(value => this.gotWalletJournal(value), error => this.gotWalletJournal(error))
     
    //this._esiCalls.walletJournalEvent.subscribe(value => this.gotWalletJournal(value));
 console.log(this.chartH);
  }

  ngOnInit(){


      //create profit loss bar chart
      this._gc.createGraph(this.bar_ChartOptions,"BarChart",this.bar_ChartData,"bar_chart");

      //create profit stats chart
      this._gc.createGraph(this.profitStats_ChartOptions,"PieChart",this.profitStats_ChartData,"profitStats_chart");

      //create loss stats chart
      this._gc.createGraph(this.lossStats_ChartOptions,"PieChart",this.lossStats_ChartData,"lossStats_chart");

      

    }


gotWalletJournal(value){

    console.log(value)

}


private bar_ChartData = [
          ['Month', 'Profit', 'Loss', { role: 'style' }],
          ['Jan', 235, 400,'color: red'],
          ['Feb', 275, 367,'color: red'],
          ['Mar', 374, 535,'color: red'],
          ['Apr', 642, 453,'color: red'],
          ['May', 626, 356,'color: red'],
          ['Jun', 735, 325,'color: red'],
          ['Jul', 424, 723,'color: red'],
          ['Aug', 352, 653,'color: red'],
          ['Sep', 435, 634,'color: red'],
          ['Oct', 242, 423,'color: red'],
          ['Nov', 653, 253,'color: red'],
          ['Dec', 436, 473,'color: red']
          ];
  private bar_ChartOptions  = {
            height: 500,
            title: 'Monthly P/L - in Millions of Isk',
            subtitle: 'Your monthly profits and losses',
            colors: ['green','red'],
            backgroundColor: 'transparent',
            is3D: true,
            legendTextStyle: { color: '#FFF' },
            titleTextStyle: { color: '#FFF' },
            hAxis: {
                textStyle:{color: '#FFF'},
                baseline:{color: '#FFF'}
            },
             vAxis: {
                textStyle:{color: '#FFF'},
                baseline:{color: '#FFF'}
            },
            chartArea:{top:40,left:60, bottom:40, right:60, height:700},
            animation:{startup:true},
            legend:{position: 'none'}
          
        };

      private profitStats_ChartData = [
          ['Description', 'Profits Percentage'],
          ['Bounty Prizes',     11],
          ['Market Trans',      2],
          ['Player Donation',  2],
          ['Mission Rewards', 2],
          ['Deposit',    7]
        ];

       private profitStats_ChartOptions = {
        height: 500,
          title: 'YTD Profits Chart',
          backgroundColor: {
            fill:'transparent',
            stroke: '#000000'

            },
            is3D: false,
            legendTextStyle: { color: '#FFF' },
            titleTextStyle: { color: '#FFF' },
            hAxis: {
                textStyle:{color: '#FFF'},
                baseline:{color: '#FFF'}
            },
             vAxis: {
                textStyle:{color: '#FFF'},
                baseline:{color: '#FFF'}
            },
            chartArea:{left:20,top:50, right:20, width:'80%',height:700,
              backgroundColor:{
                stroke:'#333',
                strokeWidth:'0'
              } 
          },
            animation:{startup:true},
            legend:{position: 'bottom', textStyle: {color: 'white', fontSize: 12}}

          };

        private lossStats_ChartData = [
          ['Description', 'Profits Percentage'],
          ['Taxes',     3],
          ['Market Trans',      12],
          ['Player Donation',  5],
          ['Insurance', 2]
        ];

       private lossStats_ChartOptions = {
        height: 500,
          title: 'YTD Losses Chart',
          backgroundColor: {
            fill:'transparent',
            stroke: '#000000'

            },
            is3D: false,
            legendTextStyle: { color: '#FFF' },
            titleTextStyle: { color: '#FFF' },
            hAxis: {
                textStyle:{color: '#FFF'},
                baseline:{color: '#FFF'}
            },
             vAxis: {
                textStyle:{color: '#FFF'},
                baseline:{color: '#FFF'}
            },
            chartArea:{left:20,top:50, right:20, width:'80%',height:700,
              backgroundColor:{
                stroke:'#333',
                strokeWidth:'0'
              } 
          },
            animation:{startup:true},
            legend:{position: 'bottom', textStyle: {color: 'white', fontSize: 12}}

          };






}