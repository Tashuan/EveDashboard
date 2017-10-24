import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { CharInfoComponent } from './charInfo.component';
import { FinanceComponent } from './finance.component';
import { ProfitChartComponent } from './profitChart.component';
import {ParseResponsesService} from '../services/parseResponses.service';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import {RecentTransComponent} from './recentTrans.component'



@NgModule({
  declarations: [
    AppComponent, CharInfoComponent, FinanceComponent, ProfitChartComponent, FinanceComponent, RecentTransComponent, GoogleChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ParseResponsesService, GoogleChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
