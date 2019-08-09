# Expo Template

## Framework

### DONE

1. UI -> React Native -> [Expo](https://expo.io/)
2. Test -> Jest
3. Style -> Styled-Components
4. DataFlow -> Redux
5. AutoPack -> CircleCi

### TODO

1. Redux -> Redux Saga -> @360node/xxx
2. Router -> React Navigation
3. SDK -> Mock
4. Some params in the expo need to be fixed by `sketch init` command.

## Guide Line

### Pre Actions

1. Install `Xcode` and `Android Studio`
2. Register on [expo](https://expo.io/)
3. Register for apple developer(For iOS only)
4. Register for Android key? (Need to be confirmed)
5. Install Expo on iOS and Android for testing on mobiles
6. Install `expo-cli` by `npm install -g expo-cli` or `yarn global add expo-cli` 

### How to run

1. `yarn`
2. `yarn start` then do as the promotion.
3. You can make actions such as `Run on iOS simulator` or `Run on Android device/emulator`

#### How to run as ios

1. Run `yarn start:ios` then iOS simulator will start.
2. Find `Expo` app on iOS simulator and open it.
3. Open your app in `Expo` and you will find the page.

#### How to run as android

##### On your phone
1. Install `expo` on your android phone
2. Toggle your android phone `debugger mode` to `on`.
3. Plug your android phone to your computer.
4. Run `yarn start:android`.
5. Open `expo` on your phone and start develop.

##### On the emulator
1. Open `Android Studio` and init
2. Open `Config` => `AVD`
3. Install a new virtual device
4. Start emulator
5. Click `Run on Android device/emulator`
6. Open expo on emulator and start developing

### How to test

Run `yarn test`



### CircleCi

Need to set two params.

1. `EXPO_USERNAME` username of [expo](https://expo.io/)
2. `EXPO_PASSWORD` password of [expo](https://expo.io/)

### Workflow

We rely on Expo to build packages.

![workflow](https://docs.expo.io/static/images/project-lifecycle-workflows.png)

You can go to [Expo Documents](https://docs.expo.io/versions/latest/) to have a detailed look.
