import { InjectionToken } from "@angular/core";

export const API_SERVER_PATH = new InjectionToken<string>("Url path to data server");
export const SITE_URL = new InjectionToken<string>("Url path to the client site main page");