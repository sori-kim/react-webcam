/* eslint-disable no-restricted-globals */
self.onmessage = function (event) {
  let message = {};
  let intervalID = null;
  message = event.data;
  console.log(message);

  intervalID = setInterval(() => {
    self.postMessage(message);
    if (message >= 30) {
      clearInterval(intervalID);
      message.stop = true;
      self.postMessage(message);
    }
  }, 1000);
};
