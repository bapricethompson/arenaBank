import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, Provider, useTheme } from "react-native-paper";

const DropdownMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("Select an option");
  const theme = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onSelect = (option) => {
    setSelected(option);
    closeMenu();
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <View style={styles.anchorWrapper}>
              <Button
                mode="outlined"
                onPress={openMenu}
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={{ color: theme.colors.primary, fontWeight: "600" }}
                uppercase={false}
              >
                {selected}
              </Button>
            </View>
          }
          contentStyle={styles.menuContent}
        >
          <Menu.Item
            onPress={() => onSelect("Option 1")}
            title="Option 1"
            titleStyle={styles.menuItemText}
          />
          <Menu.Item
            onPress={() => onSelect("Option 2")}
            title="Option 2"
            titleStyle={styles.menuItemText}
          />
          <Menu.Item
            onPress={() => onSelect("Option 3")}
            title="Option 3"
            titleStyle={styles.menuItemText}
          />
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  anchorWrapper: {
    width: 200, // 👈 Ensures iOS calculates anchor layout correctly
  },
  button: {
    borderRadius: 4,
    borderColor: "#6200ee",
    borderWidth: 1,
    width: "100%",
  },
  buttonContent: {
    height: 48,
    paddingHorizontal: 16,
  },
  menuContent: {
    borderRadius: 4,
    backgroundColor: "white",
    elevation: 4,
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
  },
});

export default DropdownMenu;
