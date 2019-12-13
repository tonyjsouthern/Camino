export class LocStor {

  createServerObject(object){
    var serverObject;
    return serverObject = {
      name: object.name,
      address: object.address,
      username: object.username,
      password: object.password
    }
  }

  createCurrentDatabase(object) {
    this.setItem('currentDatabase', object)
  }

  setItem(name, object){
    localStorage.setItem(name,JSON.stringify(object));
  }

  getItem(name){
    var item = localStorage.getItem(name);
    return JSON.parse(item)
  }

  deleteItem(name){
    return localStorage.removeItem(name);
  }

  getAllItems(){
    return localStorage;
  }

  getAllServers(){
    var serverArray = [];
    var allStorage = this.getAllItems();
    Object.entries(localStorage).forEach(
      ([key, value]) => {
        if (JSON.parse(value).server == undefined && key != 'settings') {          
          serverArray.push(JSON.parse(value))
        }
      }
    )
    return serverArray;
  }

}
