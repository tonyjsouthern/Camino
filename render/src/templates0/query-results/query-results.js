import { bindable, bindingMode } from 'aurelia-framework';

export class QueryResults {

  @bindable ({ defaultBindingMode: bindingMode.twoWay }) shared;

  constructor(){
  }

}
