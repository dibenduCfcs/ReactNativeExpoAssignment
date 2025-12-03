import VideoPlayerScreen from "@/screens/VideoPlayerScreen";
import WebViewScreen from "@/screens/WebViewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{statusBarStyle:'dark',statusBarAnimation:'none',}}>
        <Stack.Screen
          name="WebViewPage"
          component={WebViewScreen}
          options={{ title: "WebView + Notifications" }}
        />

        <Stack.Screen
          name="VideoPlayerScreen"
          component={VideoPlayerScreen}
          options={{ title: "HLS Video Player" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
