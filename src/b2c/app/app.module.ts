/**
 * This will serve is root module. Importing all root/top level app modules.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpTransferModule } from '@ngx-universal/state-transfer';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
/* import { RouterModule } from '@angular/router'; */

@NgModule({
  imports: [
    BrowserModule,
    HttpTransferModule.forRoot(),
    HttpModule
  ],
  declarations: [AppComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
