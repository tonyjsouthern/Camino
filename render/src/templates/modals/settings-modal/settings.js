import { bindable, bindingMode } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { LocStor } from "../../../services/localstorage.js";

@inject(LocStor)
export class Settings {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) shared;

  constructor(LocStor) {
    this.LocStor = LocStor;
  }

  attached() {
      this.checkAndLoadSettings()
  }

  saveSettings () {
    this.shared.settingsVisble = false;
    this.LocStor.setItem('settings', this.shared.settings)
  }

  checkAndLoadSettings() {
    var settings = this.LocStor.getItem('settings');
    if(settings == null){
      this.LocStor.setItem('settings', this.shared.defaultSettings)
      this.shared.settings = settings;
    }else{
      this.shared.settings = this.LocStor.getItem('settings');
    }
  }

}
