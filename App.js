import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./components/Screen1"
import ListScreen from "./components/Screen2"
import CameraScreen from "./components/CameraScreen"
import BigPhoto from "./components/BigPhotoScreen"

const Root = createStackNavigator({
  s1: { screen: HomeScreen },
  s2: { screen: ListScreen },
  s3: { screen: CameraScreen },
  s4: { screen: BigPhoto },
});

const App = createAppContainer(Root);
export default App;