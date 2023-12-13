This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Info

Features

1.  Gallery Screen
    Displays all art gallery data with pagination for an organized viewing experience.
    Clicking on each card redirects users to a detailed view of the selected art piece.
    A favorite icon is added to each card, enabling users to curate a personalized favorites list.
2.  Favorites Screen
    Presents a list of the user's favorite art pieces.
    Utilizes an SQL database to store and retrieve favorite selections.
    Favorites data persists until the app is uninstalled, ensuring a seamless user experience.
3.  Filters Screen
    An additional screen offering enhanced functionality.
    Includes a basic filter and search feature for refining the art gallery display.
    Integrates a favorite icon similar to the Gallery screen for consistency.

(Things missed):
Due to time constraints,
.comprehensive test cases have not been implemented. Contributions in this area are highly encouraged to ensure the app's robustness.
.UI Enhancement. Contributions to improve the user interface, responsiveness, and overall aesthetics.
.Api rendering .

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

```

### For iOS

```bash
# using npm
npm run ios

```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.xw
