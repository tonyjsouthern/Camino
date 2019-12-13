import { bindable, bindingMode } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { LocStor } from "../../services/localstorage.js";
import { BackendService } from "../../services/service.js";

@inject(LocStor, BackendService)
export class ToolMenu {
    @bindable({
        defaultBindingMode: bindingMode.twoWay
    }) shared;

    constructor(LocStor, BackendService) {
        this.LocStor = LocStor;
        this.BackendService = BackendService;
        this.handleKeypress = (event) => {
            if (event.key == 'F5') {
                this.runSql();
            }
        };
    }

    attached() {
        var textEditor = document.getElementById('editor-cont')
        textEditor.addEventListener('keydown', this.handleKeypress);
    }

    async runSql() {
        document.getElementById("execute").classList.add("loading");
        var query = this.checkForSelection();
        this.shared.selectedServer.queries = query;
        this.shared.selectedServer.limit = this.shared.settings.limiter;
        console.log(this.shared.selectedServer)
        this.resetResults();
        var resultString = await this.BackendService.runQuery(this.shared.selectedServer);
        var result = JSON.parse(resultString);
        if (result.message == undefined) {
            this.displayResults(result);
        } else {
            this.shared.error = result;
        }
        document.getElementById("execute").classList.remove("loading");
    }

    checkForSelection() {
        var input = this.shared.editor.getSelection();
        if (input == "" || input == " ") {
            return this.shared.editor.getValue();
        } else {
            return this.shared.editor.getSelection();
        }
    }

    resetResults() {
        this.shared.error = '';
        this.shared.results = [];
        this.shared.keys = [];
    }

    displayResults(array) {
        this.shared.keys = Object.keys(array[0]);
        const n = array.length;
        for (var i = 0; i < n; i++) {
            this.shared.results.push(Object.values(array[i]));
        }
    }

}
