export default 
{
  "expo": {
    "name": "AwesomeProject",
    "slug": "AwesomeProject",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }, 
    "extra": {
      X_Groupe_key: process.env.X_GROUP_AUTH_KEY,
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
      NEWS_API_KEY: process.env.NEWS_API_KEY,
      BOURSE_API_KEY: process.env.BOURSE_API_KEY,
    }
  }
}
