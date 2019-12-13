export class BackendService {

  getDbs(config) {
    window.ipc.send('auth-getdbs', config);
    return new Promise((resolve, reject) => {
      window.ipc.on('auth-getdbs-reply', (event, result) => {
        resolve(result);
      });
    });
  }

  runQuery(config){
    window.ipc.send('run-query', config);
    return new Promise((resolve, reject) => {
      window.ipc.on('run-query-reply', (event, result) => {
        resolve(result);
      });
    });
  }

}
