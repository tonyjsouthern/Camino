import { bindable, bindingMode } from "aurelia-framework";

export class Placeholder {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) shared;

  toggleMenu(){
    this.shared.slideout.toggle()
  }

}
