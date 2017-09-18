/**
 * This file and `main.browser.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
import { AppComponent } from './index';
// import { RouterModule } from '@angular/router';

/**
 * Top-level NgModule "container"
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * NodeModule, NodeHttpModule, NodeJsonpModule are included
     */
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    ServerModule,
    ServerStateTransferModule.forRoot()    
  ]
})
export class AppModule {
  constructor(private readonly stateTransfer: StateTransferService){

  }

  ngOnBootstrap = ()=>{
    this.stateTransfer.inject();
  }
}
