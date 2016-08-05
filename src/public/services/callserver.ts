import { Headers, Http } from '@angular/http';
import { serviceRouteHash } from "../app.service.route";
import 'rxjs/add/operator/toPromise';
import { Injectable }    from '@angular/core';


const service_route_models = Object.keys(serviceRouteHash);

let getMethodName = (_action: string): string => {
  return _action.split("_").map((e: string, i) => {
    if (i === 0) return e;
    return e.replace(/./, (m) => m.toUpperCase());
  }).join("");
}
@Injectable()
export class DBServer {
  private serviceRouteCache = {};
  private env = process.env.ENV;
  call(_action: string, _params?) {
    let routeConfig = this.getRequestRouteConfig(_action);
    if (!routeConfig) throw new Error("not find service route config: " + _action);
    if (this.env === "development") {
      if (!window["ZBase"] || !window["ZBase"].TestServer) throw new Error("not find TestServer");
      let model = routeConfig.model_name.replace(/./, (m) => m.toUpperCase());
      if (!window["ZBase"].TestServer[model]) throw new Error("nor find TestServer db: " + model);
      let method_name = getMethodName(routeConfig.action);
      if (!window["ZBase"].TestServer[model][method_name]) throw new Error("nor find TestServer db fun: " + model + "." + method_name);
      return Promise.resolve(window["ZBase"].TestServer[model][method_name](_params));
    }
    return this[routeConfig.type](routeConfig.url, _params, routeConfig);
  }
  constructor(private http: Http) {
    service_route_models.forEach(m => {
      serviceRouteHash[m].routes.forEach(r => {
        this.serviceRouteCache[m + "-" + r[0]] = {
          url: r[2],
          action: r[0],
          type: r[1],
          model_name: m
        };
      });
    });
  }
  private get(_url: string, _params, _routeConfig) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(_url, _params).toPromise().catch(this.handleError);
  }
  private post(_url: string, _params, _routeConfig) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(_url, _params)
      .toPromise()
      .catch(this.handleError);
  }
  private getRequestRouteConfig(_action: string) {
    return this.serviceRouteCache[_action];
  }
  private handleError(error: any) {
    console.error("request error:", error);
    return Promise.reject(error.message || error);
  }
}
@Injectable()
export class BaseService {
  constructor(protected model_name: string, protected dbServer: DBServer) {
    if (!serviceRouteHash[model_name]) {
      throw new Error("not find service route model: " + model_name + " in \"" + service_route_models.join() + "\"");
    }
    serviceRouteHash[this.model_name].routes.forEach(element => {
      let _action = this.model_name + "-" + element[0];
      let method_name = getMethodName(element[0]);

      this[method_name] = (_params) => {
        return this.dbServer.call(_action, _params);
      };
    });
  }
}