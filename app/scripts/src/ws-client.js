let socket;

function init(url) {
  console.log('connecting...');
  socket = new WebSocket(url);
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function() {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  console.log('open');
  socket.onmessage = e => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
