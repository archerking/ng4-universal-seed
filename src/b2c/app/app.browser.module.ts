/**
 * Browser (client) index module.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserStateTransferModule } from '@ngx-universal/state-transfer';
import { AuthModule } from '@ngx-auth/core';
import { environment } from '../environments/environment';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
// import { RouterModule } from '@angular/router';

/**
 * Top-level NgModule "container"
 */
@NgModule({
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * BrowserModule, HttpModule, and JsonpModule are included
     */
    BrowserModule.withServerTransition({
      appId: 'MY_APP_TOKEN'
    }),
    BrowserStateTransferModule.forRoot(),
    AuthModule.forRoot(),
    AppModule
  ],
  /** Root App Component */
  bootstrap: [ AppComponent ]
})
export class AppModuleClient {

}
