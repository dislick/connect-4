enum Chip {
  Empty,
  Red,
  Blue
}

enum GameStatus {
  Open,   // 0
  Draw,   // 1
  RedWin, // 2
  BlueWin // 3
}

const drawGame = (grid: Chip[][], canvas: HTMLCanvasElement) => {
  let context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);

  const getColor = (chip: Chip): string => {
    switch (chip) {
      case Chip.Empty:
        return 'rgba(0, 0, 0, 0.1)';
      case Chip.Red:
        return 'red';
      case Chip.Blue:
        return 'blue';
    }
  }

  const chipSize = 30;
  const chipSpacing = 3;

  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      context.fillStyle = getColor(grid[y][x]);
      context.beginPath();
      let positionX = x * chipSize + chipSize / 2 + chipSpacing * x;
      let positionY = y * chipSize + chipSize / 2 + chipSpacing * y;
      context.arc(positionX, positionY, chipSize / 2, 0, 2 * Math.PI);
      context.fill();
    }
  }
};

const dropChip = (position: number) => {
  let didInsert = insertChipIntoGrid(grid, currentChip, position);
  if (!didInsert) return;
  currentChip = currentChip === Chip.Blue ? Chip.Red : Chip.Blue;
  drawGame(grid, canvas);
  announceGameStatus(checkGameStatus(grid));
};

const insertChipIntoGrid = (grid: Chip[][], chip: Chip, position: number): boolean => {
  let couldInsertIntoGrid = false;
  for (let y = grid.length - 1; y >= 0; y--) {
    if (grid[y][position] === Chip.Empty) {
      grid[y][position] = chip;
      couldInsertIntoGrid = true;
      break;
    }
  }
  return couldInsertIntoGrid;
};

const checkGameStatus = (grid: Chip[][]): GameStatus => {
  // check horizontal win
  if (checkWin(grid, Chip.Blue)) {
    return GameStatus.BlueWin;
  }
  if (checkWin(grid, Chip.Red)) {
    return GameStatus.RedWin;
  }
  return GameStatus.Open;
};

const checkWin = (grid: Chip[][], chipType: Chip): boolean => {
  // horizontal
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length - 3; j++) {
      if (grid[i][j] === chipType && grid[i][j + 1] === chipType && grid[i][j + 2] === chipType && grid[i][j + 3] === chipType) {
        return true;
      }
    }
  }

  // vertical
  for (let i = 0; i < grid.length - 3; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === chipType && grid[i + 1][j] === chipType && grid[i + 2][j] === chipType && grid[i + 3][j] === chipType) {
        return true;
      }
    }
  }

  // diagonal asc
  for (let i = 3; i < grid.length; i++) {
    for (let j = 3; j < grid[0].length; j++) {
      if (grid[i][j] === chipType && grid[i - 1][j + 1] === chipType && grid[i - 2][j + 2] === chipType && grid[i - 3][j + 3] === chipType) {
        return true;
      }
    }
  }

  // diagonal desc
  for (let i = 3; i < grid.length; i++) {
    for (let j = 3; j < grid[0].length; j++) {
      if (grid[i][j] === chipType && grid[i - 1][j - 1] === chipType && grid[i - 2][j - 2] === chipType && grid[i - 3][j - 3] === chipType) {
        return true;
      }
    }
  }
};

const announceGameStatus = (status: GameStatus) => {
  let announcementFunction = console.log;

  switch (status) {
    case GameStatus.RedWin:
      announcementFunction('Red won!');
      break;
    case GameStatus.BlueWin:
      announcementFunction('Blue won!');
      break;
    case GameStatus.Draw:
      announcementFunction('Nobody won!');
      break;
  }
}



let grid = [
  [Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty],
  [Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty],
  [Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty],
  [Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty],
  [Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty],
  [Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty, Chip.Empty],
];
let canvas = <HTMLCanvasElement>document.getElementById('game');
let currentChip = Math.random() > 0.5 ? Chip.Blue : Chip.Red;


drawGame(grid, canvas);
