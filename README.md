# Left2Chef 

Left2Chef is a smart, localized recipe application built with Expo and React Native. It's designed to help you figure out what to cook today by matching the ingredients you already have in your kitchen with delicious recipes.

## Features

- **Ingredient Matching Engine:** Simply input what ingredients you have in your fridge, and the custom matching engine will instantly calculate match percentages and show you what recipes you can make.
- **Daily Specials:** If you don't feel like searching, the Home dashboard automatically serves up randomized daily recipe recommendations.
- **Explore & Filter:** Search manually for recipes and filter the database by dietary preferences (Veg, Non-Veg, Vegan).
- **CookBook Local Storage:** Found a recipe you like? Save it! The CookBook securely saves your favorite recipes locally to your device using AsyncStorage.
- **Beautiful UI:** Provides an aesthetic, smooth user experience powered by custom React Native components and centralized theming.

## Tech Stack

- **Framework:** React Native / Expo
- **Language:** TypeScript
- **Navigation:** Expo Router
- **Storage:** React Native Async Storage

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You will also need the Expo Go app installed on a physical device, or an Android/iOS emulator configured on your desktop.

### Installation

1. Clone your repository:
   ```bash
   git clone https://github.com/Krish7377/Left2Chef.git
   cd Left2Chef
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Open the app:
   - Press `a` in the terminal to open it on an Android emulator.
   - Press `i` to open it on an iOS simulator.
   - Or, scan the QR code generated in the terminal using your phone's camera (iOS) or the Expo Go app (Android).

## License

This project is licensed under the MIT License.
