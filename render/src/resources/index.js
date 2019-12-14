export function configure(config) {
  //config.globalResources([]);
}

window.ipc.on('updateReady', function(event, text) {
    // changes the text of the button
    console.log("ready")
    var container = document.getElementById('ready');
    container.innerHTML = "New Version Available!";
})
