module.exports = function ({ dbModels, config }, server, helper) {
  const io = require('socket.io')(server);
  const connections = {};
  const connectedSockets = {};

  io.on('connection', function (socket) {
    console.log('Device connected with socket id: ', socket.id);
    socket.on('disconnect', function (data) {
      try {
        const userId = connectedSockets[socket.id];
        if (userId) {
          delete connectedSockets[socket.id];
          delete connections[userId][socket.id];
          console.log('disconnected socketId: ', socket.id, ' of user: ', userId);
        } else {
          console.log('disconnected socketId: ', socket.id);
        }
        socket.disconnect();
      } catch (ex) {
        console.log('exception ', ex);
      }
    });
    socket.on('connect', function (data) {
      // save the socket
      console.log('socket connected: ', data.userId, ', with socket: ', socket.id);
      if (connections[data.userId]) {
        connections[data.userId][socket.id] = socket;
      } else {
        connections[data.userId] = {};
        connections[data.userId][socket.id] = socket;
      }
      connectedSockets[socket.id] = data.userId;
    });
    socket.on(config.socketChannels.receiveDataToClient, function (data) {
      console.log('received from client', data);
    });
  });

  async function emit(event, data, userIds = []) {
    //just send userIds in form of array and it will do the rest
    for (const userId of userIds) {
      //emit to user
      if (userId) {
        for (const props in connections[userId]) {
          if (connections[userId].hasOwnProperty(props)) {
            connections[userId][props].emit(event, data);
          }
        }
      }
    }
  }

  return {
    emit: emit
  };

};
