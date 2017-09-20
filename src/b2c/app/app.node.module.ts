/**
 * Server index module
 */
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../environments/environment';
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
/**
 * Will be used for JWT based authentication.
 */
import { AuthModule } from '@ngx-auth/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

export function bootstrapFactory(
  appRef: ApplicationRef,
  stateTransfer: StateTransferService
): () => Subscription {
    return () => appRef['isStable']
    .filter(stable => stable)
    .first()
    .subscribe(() => {
      stateTransfer.inject();
    });
}

/**
 * Top-level NgModule "container"
 */
@NgModule({
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     */
    BrowserModule.withServerTransition({
      appId: 'MY_APP_TOKEN'
    }),
    ServerModule,
    ServerStateTransferModule.forRoot(),
    AuthModule.forServer(),
    AppModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: bootstrapFactory,
      multi: true,
      deps: [
        ApplicationRef,
        StateTransferService
      ]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModuleServer {
}
