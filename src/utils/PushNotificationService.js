
const { Platform } = require("react-native");
var PushNotification = require("react-native-push-notification");

//token data
const PushtokenData = {
    token:null,
    Platform:null
}

//create channel for notifications
PushNotification.createChannel(
    {
      channelId: "YouCast",
      channelName: "YouCast channel",
    }
  );
  
const configurePush = ()=>{
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: onRegister,
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: onNotificationReceived,
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
      
        // Should the initial notification be popped automatically
        // default: true
        senderID: '492086195605',
        popInitialNotification: true,
        requestPermissions: true,
      });

}

const onRegister = (token)=>{
    const currentPlatform = Platform.OS == "ios"?"ios":"Android"
    PushtokenData.token = token
    PushtokenData.Platform = currentPlatform
}

const onNotificationReceived = (notification)=>{
    if (
        Platform.OS === 'android'&&
        !notification.userInteraction &&
        notification.foreground &&
        notification.visibility === 'private'
      ) {
        toastLocalNotification(notification);
      }
}

function toastLocalNotification(notification) {
    PushNotification.localNotification({
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      color: '#FAC01C',
      channelId: 'YouCast',
      title: notification.title,
      message: notification.message,
    });
  }

  export {configurePush, PushtokenData};
