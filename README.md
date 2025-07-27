# Arena Bank

**Arena Bank** is a party game app built with [React Native](https://reactnative.dev/) and [Expo](https://expo.dev/), designed for large gatherings. Players join a shared game of "bank", but with a twist. This isn’t your traditional bank! We’ve added power-ups, timed rolls, and custom game logic to make the experience more fast-paced, chaotic, and fun.

Whether you're at a family reunion, game night, or party, **Arena Bank** makes it easy to dive into group fun with just a smartphone.

---

## Features

- **Join Multiplayer Games** — Players connect and play together in real time.
- **Timed Rolls** — Keep the pace fast and strategic.
- **Power-Ups** — Add unpredictable elements to keep everyone on their toes.
- **Arena-Style Gameplay** — Designed for dynamic, in-person party environments.

---

## Tech Stack

This app is built with a powerful combination of tools:

### Core

- [`expo`](https://expo.dev/) – Fast development and easy deployment
- [`react-native`](https://reactnative.dev/) – Native mobile development

### Navigation & UI

- `expo-router` – File-based routing system for screens
- `@react-navigation/native`, `bottom-tabs`, `elements` – Smooth and flexible navigation
- `react-native-paper`, `@expo/vector-icons`, `react-native-vector-icons` – Modern Material Design components and icons
- `react-native-dropdown-picker` – For clean and interactive dropdowns

### Real-Time Communication

- `socket.io` & `socket.io-client` – Live multiplayer syncing and event broadcasting

### Backend

The backend is currently **a work in progress** and will eventually support game state management, player matchmaking, persistent data, and more using:

- `express`
- `firebase`
- `cors`
- `websockets`

---

## Design Principles

### 1. Consistent Layout and Hierarchy

- Titles are styled clearly using `fontSize: 32` and bold weight, following best practices from both Material Design and Apple’s HIG.
- Centralized layouts using `alignItems: "center"` and `marginHorizontal: "auto"` ensure that content is readable and well-balanced on all screen sizes.

### 2. Use of Elevation & Color Contrast

- `StyledButton` follows Material Design by using `react-native-paper`’s `Button` component with:

- `mode="contained"` for clear visual hierarchy.
- Custom theming through a consistent background color (`#FF6F61`) and vertical padding (`contentStyle={{ paddingVertical: 12 }}`).
- Appropriate text sizes (`labelStyle={{ fontSize: 18 }}`) and layout spacing (`marginVertical: 15`, `alignSelf: "center"`, `width: "80%"`), aligning with Material Design principles like clarity, legibility, and accessible touch targets.

- Input fields use a white background with subtle grey borders, this ensures good color contrast and readability across devices and lighting conditions.

### 3. Spacing and Padding

- The use of `padding: 15` and `marginBottom` across containers and inputs aligns with Material Design’s emphasis on whitespace as a layout tool.
- These spacing patterns help prevent visual clutter and guide user focus naturally.

---

## WireFrames

![Screens](./design.png)
![Screens](./design2.png)
