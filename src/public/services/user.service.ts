import { BaseService, DBServer } from "./callserver";
import { serviceRouteHash } from "../app.service.route";
import { Injectable }    from '@angular/core';
@Injectable()
export class UserService extends BaseService {
  constructor(private _dbServer: DBServer){
    super(serviceRouteHash.user.model_name, _dbServer);
  }
}