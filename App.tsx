import { Fragment, ReactNode, useState } from "react";
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TVFocusGuideView,
  View,
} from "react-native";

const scale = Dimensions.get("window").width / 1920;

export default function App() {
  return (
    <Fragment>
      <View style={styles.container}>
        <Button hasTVPreferredFocus>Press left to open menu</Button>
        <View style={styles.textContent}>
          <Text style={styles.text}>
            On Android TV, the menu opens. Logs show "onBlur Pressable" /
            "onFocus Pressable" / "onFocus TVFocusGuideView"
          </Text>
          <Text style={styles.text}>
            On tvOS, the menu does not open. Logs show "onBlur Pressable" /
            "onFocus Pressable" / "onFocus TVFocusGuideView" / "onBlur
            TVFocusGuideView". That extra onBlur in TVFocusGuideView is the
            problem.
          </Text>
        </View>
      </View>
      <Menu>
        <Button>A</Button>
        <Button>B</Button>
      </Menu>
    </Fragment>
  );
}

const Menu = ({ children }: { children?: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <TVFocusGuideView
      autoFocus
      style={[styles.menu, { width: isMenuOpen ? 400 * scale : 120 * scale }]}
      onFocus={() => {
        console.log("onFocus TVFocusGuideView");
        setIsMenuOpen(true);
      }}
      onBlur={() => {
        console.log("onBlur TVFocusGuideView");
        setIsMenuOpen(false);
      }}
    >
      {children}
    </TVFocusGuideView>
  );
};

const Button = ({
  children,
  ...props
}: PressableProps & { children: React.ReactNode }) => (
  <View>
    <Pressable
      {...props}
      style={({ focused }) => ({
        ...styles.button,
        borderColor: focused ? "white" : "transparent",
      })}
      onFocus={() => console.log("onFocus Pressable")}
      onBlur={() => console.log("onBlur Pressable")}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  menu: {
    height: "100%",
    backgroundColor: "#222",
    justifyContent: "center",
    gap: 20 * scale,
    padding: 10 * scale,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    gap: 20 * scale,
  },
  button: {
    backgroundColor: "grey",
    borderRadius: 6 * scale,
    borderWidth: 4 * scale,
    padding: 20 * scale,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30 * scale,
  },
  textContent: {
    width: 1000 * scale,
  },
  text: {
    color: "white",
    fontSize: 30 * scale,
  },
});
