/**
 * the polyfills must be the first thing imported
 */
import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/bootloader';
import { AppModule } from './app/app.browser.module';

/**
 * enable prod mode for production environments
 */
if (environment.production) {
  enableProdMode();
}

export function main(): any {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}
bootloader(main);
