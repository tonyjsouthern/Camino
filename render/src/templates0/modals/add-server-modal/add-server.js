import { bindable, bindingMode } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { LocStor } from "../../../src/services/localstorage.js";

@inject(LocStor)
export class AddServer {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) shared;

  constructor(LocStor) {
    this.LocStor = LocStor;

    this.serverInfo = {
      name: "",
      address: "",
      username: "",
      password: ""
    };
  }

  addServer() {
    var serverObject = this.LocStor.createServerObject(this.serverInfo);
    this.LocStor.setItem(this.serverInfo.name, serverObject);
    this.shared.showAddModal = false
    this.shared.serverArray.push(serverObject);
  }

}
