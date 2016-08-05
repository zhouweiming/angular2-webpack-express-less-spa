import {User} from "./user";

let ZBase = window["ZBase"] || {};

ZBase.TestServer = {
  User: User
};

window["ZBase"] = ZBase;