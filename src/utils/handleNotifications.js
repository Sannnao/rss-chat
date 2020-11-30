export const handleNotifications = (receivedData) => {
  Notification.requestPermission((permission) => {
    if (permission === 'granted' && document.hidden) {
      const { from, message } = receivedData[0];

      const notifyOptions = {
        body: `${from}`,
        silent: true,
      };

      new Notification(`${message}:`, notifyOptions);
    }
  });
}
