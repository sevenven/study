addEventListener("message", function (event) {
  const promise = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (clientList) {
      const senderID = event.source?.id || "unknown";
      console.log(clientList);
      clientList.forEach(function (client) {
        console.log(senderID, client.id);
        if (client.id == senderID) {
          return;
        } else {
          client.postMessage({
            client: senderID,
            message: event.data,
          });
        }
      });
    });
  event.waitUntil(promise);
});
