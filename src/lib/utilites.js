import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const isIPHONEX = Platform.OS == "ios" && (height > 750 || width > 750);
const isANDROID = Platform.OS == "android";

const ToolbarHeight = () => {
    // const toolbarHeight = isIPHONEX ? RScaler(9) : isANDROID ? RScaler(9) : RScaler(9);
    const toolbarHeight = RScaler(9);
    return toolbarHeight;
}

const RScaler = (precent) => {
    const deviceHeight = isIPHONEX ? height - 78 : isANDROID ? height - StatusBar.currentHeight : height;
    const fontSize = (precent * deviceHeight) / 100;
    return Math.round(fontSize);
}

export { ToolbarHeight, RScaler };