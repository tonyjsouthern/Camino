import { bindable, bindingMode } from 'aurelia-framework';

export class TextEditor {

  @bindable ({ defaultBindingMode: bindingMode.twoWay }) shared;

  attached(){
    this.setEditor();
  }

  setEditor(){
    this.shared.editor = CodeMirror(document.getElementById('editor-cont'), {
      value: "select count(*) from rsk_customers",
      mode:  "sql",
      theme: "duotone-light",
      lineNumbers: true
    });
  }

}
