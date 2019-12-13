import { bindable } from "aurelia-framework";

export class Menu {
  @bindable shared;

  constructor() {
    this.maximized = false;
  }

  minimizeWindow() {
    window.ipc.send("minimize-window");
  }

  maximizeWindow() {
    window.ipc.send("maximize-window");
    this.maximized = true;
  }

  unMaximizeWindow() {
    window.ipc.send("un-maximize-window");
    this.maximized = false;
  }

  closeWindow() {
    window.ipc.send("close-window");
  }
}
