import axios from "axios";
import queryString from "querystring";
import { testUrl } from "../urls";

import history from "../utils/history";

const catchfunction = (err, dispatch, callback, errorCallback) => {
  if (!err.response) {
    console.log(err);
    return;
  }

  switch (err.response.status) {
    case 401: //unauthorised
    case 403: //forbidden
      history.push("/404");
    case 400: //bad request
    case 500: //server error
      console.log(err);
      break;
    case 200:
    case 201:
    case 304:
    default:
      callback(err.response.data);
      break;
  }
  if (errorCallback) {
    errorCallback(err.response.data);
  }
};

const makeCall = (params, dispatch, callback, errorCallback) => {
  let parameters = { ...params };
  if (typeof parameters.url != "string") {
    let url = parameters.url.path;
    let pathParams = Object.keys(parameters.url.param);
    for (let param of pathParams) {
      let exp = new RegExp("(:" + param + "\\b)");
      url = url.replace(exp, parameters.url.param[param]);
    }
    parameters.url = url;
  }
  parameters.headers = parameters.headers || {};

  if (parameters.method == "GET" && parameters.data) {
    parameters.url += `?${queryString.stringify(parameters.data)}`;
  }

  axios(parameters)
    .then(response => {
      callback(null, response.data);
    })
    .catch(error => {
      catchfunction(error, dispatch, callback, errorCallback);
      callback(error);
    });
};

export const apis = {
  testApi: (data, dispatch, callback) => {
    var url = testUrl;
    makeCall(
      {
        url,
        method: "GET",
        data
      },
      dispatch,
      callback
    );
  }
};
