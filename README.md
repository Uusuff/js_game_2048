# Base layout template with Gulp, SCSS and Stylelint

📸 Screenshot

- ![Preview](./src/images/reference.png)

🌐 Demo

👉 Play Online

- [DEMO LINK](https://Uusuff.github.io/js_game_2048/)

# 🎮 2048 Game

A simple implementation of the popular **2048 game** using **JavaScript, HTML, and CSS**.
The player must move tiles across a 4×4 grid, merging identical numbers and aiming to reach the **2048** tile.

---

## 🚀 Features

- 4×4 game grid
- Score counter
- **Start** and **Restart** buttons
- Keyboard controls (`Arrow Up`, `Arrow Down`, `Arrow Left`, `Arrow Right`)
- Smooth animations for new and merged tiles
- Messages for winning or losing

---

## 📂 Project Structure

```
src/
├── images/ # images and icons
├── scripts/ # game logic
│ ├── Game.js # Game class (rules and logic)
│ └── main.js # game initialization and rendering
├── styles/ # SCSS/CSS styles
│ └── main.scss
└── index.html # main page
```

## 🕹️ Controls

- **Arrow keys** — move tiles
- **Start** — start a new game
- **Restart** — reset and start again

---

## 📦 Installation & Run

1. Clone the repository:

```
   git clone https://github.com/Uusuff/js_game_2048.git
```

2. Navigate to the project folder:

```
   cd js_game_2048
```

3. Installing dependencies.

```
   npm i
```

4. Open the application in your browser.

```
   npm start
```

🏆 Goal

Combine tiles, double their values, and reach the magic 2048 tile.
If the grid is full and no moves are left — the game is over.

💡 Future Improvements

- Save progress in localStorage

- Responsive layout for mobile devices

- High score leaderboard
