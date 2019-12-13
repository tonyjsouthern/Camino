import { bindable, bindingMode } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { LocStor } from "../../src/services/localstorage.js";
import { BackendService } from "../../src/services/service.js";

@inject(LocStor, BackendService)
export class ServerMenu {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) menu;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) shared;

  constructor(LocStor, BackendService) {
    // injects
    this.LocStor = LocStor;
    this.BackendService = BackendService;

    this.selectedServer;
    this.showServerList = false;
    this.handleKeypress = (event) => {
      if (event.key == 'e' && event.ctrlKey == true){
        this.shared.slideout.toggle();
      }
    };
  }

  attached() {
    this.configureSlider();
    this.loadServers();

    document.addEventListener('keydown', this.handleKeypress);
  }

  editServer() {
    var serverName = event.target.parentNode.innerText;
    this.shared.editServer = this.LocStor.getItem(serverName);
    this.shared.editServerVisible = true;
  }

  loadServers() {
    this.shared.serverArray = this.LocStor.getAllServers();
  }

  async getDbs(event) {
    event.target.classList.add("loading");
    var serverName = event.target.parentNode.innerText;
    this.shared.selectedServer.server = await this.LocStor.getItem(serverName);
    var results = await this.BackendService.getDbs(
      this.shared.selectedServer.server
    );
    event.target.classList.remove("loading");
    return this.errorHandler(results, "showServerList", "databaseArray");
  }

  searchForDatabase() {
    var input = this.menu.dbSearchInput;
    var tempArray = [];
    this.menu.databaseArray.forEach(function(db) {
      if (db.name.toLowerCase().includes(input)) {
        tempArray.push(db);
      }
    });
    this.menu.filteredDbs = tempArray;
    return true;
  }

  selectDatabase() {
    this.shared.results = [];
    var database = event.target.innerText;
    this.shared.selectedServer.server.database = database;
    this.LocStor.createCurrentDatabase(this.shared.selectedServer);
  }

  errorHandler(results, uiToggle, variable) {
    if (results.type == "Error") {
      return (this.shared.connectError = results.message);
    } else {
      this[uiToggle] = true;
      this.menu[variable] = results;
    }
  }

  configureSlider() {
    this.shared.slideout = new Slideout({
      panel: document.getElementById("panel"),
      menu: document.getElementById("menu"),
      padding: 256,
      tolerance: 70
    });

    var global = this.shared;

    document
      .querySelector(".toggle-button")
      .addEventListener("click", function() {
        global.slideout.toggle();
      });
  }
}
