import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { DBServer } from "./services/callserver";

import "./css/index.less";

import { AppLayoutComponent } from './components/app-layout/applayout.component';
import { APP_ROUTER_PROVIDERS } from './app.route';
import { ContextLayoutService } from "./services/contexttitle.service";
if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppLayoutComponent, [APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, DBServer, ContextLayoutService]);