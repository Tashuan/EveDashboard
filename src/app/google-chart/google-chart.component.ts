import {Directive,Input,OnInit} from '@angular/core';
declare var google:any;
declare var googleLoaded:any;
@Directive({
  selector: '[GoogleChart]'
})

export class GoogleChartComponent implements OnInit {
  public _element:any;
  @Input('chartType') public chartType:string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  chartPackage:string = "corechart";

  constructor() {

  }

  ngOnInit() {
    
  }

  createGraph(chartOptions,chartType,chartData,id){

     setTimeout(() =>{
            google.charts.load('current', {'packages':["corechart"]});
              setTimeout(() =>{
                this.drawGraph(chartOptions,chartType,chartData,id)
                },1000);
            },1000
          );


  }

  drawGraph (chartOptions,chartType,chartData,id) {

    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options:chartOptions || {},
        containerId: id
      })

      wrapper.draw();

      window.addEventListener("resize", function(){
        wrapper.draw();
      });


    }
  }


  createTable(chartOptions,chartType,chartData,id){

      setTimeout(() =>{
            google.charts.load('current', {'packages':["table"]});
              setTimeout(() =>{
                this.drawTable(chartOptions,chartType,chartData,id)
                },1000);
            },1000
          );


  }

  drawTable (chartOptions,chartType,chartData,id) {
  
  
    google.charts.setOnLoadCallback(drawThisTable);
    function drawThisTable() {

       var cssClassNames = {
    'headerRow': 'italic-darkblue-font large-font bold-font',
    'tableRow': '',
    'oddTableRow': 'beige-background',
    'selectedTableRow': 'orange-background large-font',
    'hoverTableRow': '',
    'headerCell': 'gold-border',
    'tableCell': '',
    'rowNumberCell': 'underline-blue-font'};
    
      var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time Employee');
        data.addRows([
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ]);

        var table = new google.visualization.Table(document.getElementById(id));

       
        table.draw(data, {allowHtml: true, showRowNumber: true, width: '100%', height: '100%', 'cssClassNames': cssClassNames});



      window.addEventListener("resize", function(){
        table.draw(data, {allowHtml: true, showRowNumber: true, width: '100%', height: '100%', 'cssClassNames': cssClassNames});
      });


    }
  }






















}