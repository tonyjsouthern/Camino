import { inject } from 'aurelia-framework';
import { LocStor } from './services/localstorage.js';
import { BackendService } from './services/service.js'

@inject( LocStor, BackendService)
export class App {

  constructor(LocStor, BackendService){
    this.LocStor = LocStor;
    this.BackendService = BackendService;

    this.menu = {
      databaseArray: [],
      filteredDbs: null,
      dbSearchInput: ''
    };

    this.shared = {
      serverArray: [],
      selectedServer: {
        limited: true
      },
      editServer: {},
      editServerVisible: false,
      keys: [],
      results: [],
      editor: '',
      error: '',
      connectError: ''
    }

  }


}
