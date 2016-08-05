import { provideRouter, RouterConfig }  from '@angular/router';
import { UsersLoginLogComponent } from './routes/users-login-log/usersloginlog.component';
import { DemoComponent } from './routes/demo/demo.component';
import { Demo1Component } from './routes/demo1/demo1.component';
import { ContextLayoutComponent } from "./components/context-layout/contextlayout.component";

const routes: RouterConfig = [
  {
    path: 'welcome',
    component: UsersLoginLogComponent
  }, {
    path: "",
    component: ContextLayoutComponent,
    children: [
      { path: "demo", component: DemoComponent },
      { path: "demo1", component: Demo1Component }
    ]
  }, {
    path: "",
    redirectTo: "/welcome",
    pathMatch: "full"
  }

  // {
  //   path: 'heroes',
  //   component: HeroesComponent
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // }, {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full'
  // }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
