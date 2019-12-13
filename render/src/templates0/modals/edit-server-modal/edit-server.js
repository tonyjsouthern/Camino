import { bindable, bindingMode } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { LocStor } from "../../../src/services/localstorage.js";

@inject(LocStor)
export class EditServer {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) shared;

  constructor(LocStor) {
    this.LocStor = LocStor;
  }

  endEditServer() {
    var serverObject = this.LocStor.createServerObject(this.shared.editServer);
    this.LocStor.setItem(this.shared.editServer.name, serverObject);
    this.shared.editServerVisible = false;
  }

  removeServer() {
    this.LocStor.deleteItem(this.shared.editServer.name);
    this.shared.serverArray.splice(
      this.shared.serverArray.indexOf(this.shared.editServer.name), 1);
    this.shared.editServerVisible = false;
  }
}
