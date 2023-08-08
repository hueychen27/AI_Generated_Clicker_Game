class ClickerGame {
  constructor() {
    this.points = 0;
    this.clickMultiplier = 1;
    this.timeLeft = 30;
    this.timer = null;
    this.clickButton = document.getElementById("click-button");
    this.pointsDisplay = document.getElementById("points-display");
    this.upgradesList = document.getElementById("upgrades-list");
    this.timerDisplay = document.getElementById("timer-display");
    this.upgrades = [
      { cost: 10, multiplier: 2 },
      { cost: 50, multiplier: 5 },
      { cost: 100, multiplier: 10 }
    ];
  }

  // Update points display
  updatePointsDisplay() {
    this.pointsDisplay.textContent = this.points;
  }

  // Buy upgrade
  buyUpgrade(cost, multiplier) {
    if (this.points >= cost) {
      this.points -= cost;
      this.clickMultiplier = multiplier;
      this.updatePointsDisplay();
    }
  }

  // Start timer
  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        alert(`Time's up! You earned ${this.points} points.`);
      }
    }, 1000);
  }

  // Update timer display
  updateTimerDisplay() {
    this.timerDisplay.textContent = `Time Left: ${this.timeLeft}`;
  }

  // Attach event listeners
  attachEventListeners() {
    this.clickButton.addEventListener("click", () => {
      this.points += this.clickMultiplier;
      this.updatePointsDisplay();
    });

    this.upgradesList.addEventListener("click", (event) => {
      const upgradeButton = event.target.closest(".upgrade");
      if (upgradeButton) {
        const index = parseInt(upgradeButton.dataset.index);
        const upgrade = this.upgrades[index];
        this.buyUpgrade(upgrade.cost, upgrade.multiplier);
      }
    });
  }

  // Initialize display
  initializeDisplay() {
    this.updatePointsDisplay();
    this.updateTimerDisplay();
    this.upgrades.forEach((upgrade, index) => {
      const upgradeButton = document.createElement("button");
      upgradeButton.textContent = `Buy ${upgrade.multiplier}x for ${upgrade.cost} points`;
      upgradeButton.dataset.cost = upgrade.cost;
      upgradeButton.dataset.multiplier = upgrade.multiplier;
      upgradeButton.dataset.index = index;
      upgradeButton.classList.add("upgrade");
      this.upgradesList.appendChild(upgradeButton);
    });
  }

  // Start game
  start() {
    this.initializeDisplay();
    this.attachEventListeners();
    this.startTimer();
  }
}

// Create a new instance of the game
const game = new ClickerGame();

// Start the game
game.start();
