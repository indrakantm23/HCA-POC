import { Injectable } from "@angular/core";
import { getAPIEndpoint } from "./ApiEndPoint";

@Injectable({
  providedIn: "root",
})
export class AppSettingsService {
  public consultantApiBaseUrl = getAPIEndpoint();

  //EXT
  public ext = {
    CoreData: {
      auth: {
        Login: "",
        LogOff: "",
      },
      Identities: {
        Identities: "api/Identities",
        link: "api/Identities/link",
        unlink: "api/Identities/unlink",
        merge: "api/Identities/merge",
        unmerge: "api/Identities/unmerge",
        delete: "api/Identities/delete",
      },
    },
  };

  constructor() {}
}
