const request_methods = {
  post: "post",
  get: "get"
};
export const serviceRouteHash = {
  "user": {
    model_name: "user",
    routes: [
      ["get_all_user_login_log", request_methods.get, ""]
    ]
  }
};