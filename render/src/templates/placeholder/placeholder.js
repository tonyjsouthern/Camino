import { bindable, bindingMode } from "aurelia-framework";

export class Placeholder {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) shared;

  constructor() {
  }
  
  toggleMenu(){
    this.shared.slideout.toggle()
  }

}
