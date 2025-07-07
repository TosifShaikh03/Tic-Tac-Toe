let currentPlayer = 'x';
        let board = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        let isComputerMode = false;
        let player1 = '';
        let player2 = '';

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function startGame(mode) {
            player1 = document.getElementById('player1Name').value || 'Player 1';
            player2 = mode === 'computer' ? 'Computer' : (document.getElementById('player2Name').value || 'Player 2');
            isComputerMode = mode === 'computer';
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';
            updateStatus();
            if (isComputerMode && currentPlayer === 'o') {
                computerMove();
            }
        }

        function updateStatus() {
            const status = document.getElementById('status');
            status.textContent = currentPlayer === 'x' ? `${player1}'s Turn (X)` : `${player2}'s Turn (O)`;
        }

        function handleCellClick(event) {
            const index = event.target.dataset.index;
            if (board[index] !== '' || !gameActive) return;

            board[index] = currentPlayer;
            event.target.classList.add(currentPlayer);
            if (checkWin()) {
                document.getElementById('status').textContent = `${currentPlayer === 'x' ? player1 : player2} Wins!`;
                gameActive = false;
                highlightWinningCells();
                return;
            }
            if (board.every(cell => cell !== '')) {
                document.getElementById('status').textContent = "It's a Tie!";
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            updateStatus();
            if (isComputerMode && currentPlayer === 'o') {
                setTimeout(computerMove, 500);
            }
        }

        function checkWin() {
            return winningCombinations.some(combination => {
                return combination.every(index => board[index] === currentPlayer);
            });
        }

        function highlightWinningCells() {
            winningCombinations.forEach(combination => {
                if (combination.every(index => board[index] === currentPlayer)) {
                    combination.forEach(index => {
                        document.querySelector(`.cell[data-index="${index}"]`).classList.add('win-animation');
                    });
                }
            });
        }

        function computerMove() {
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'o';
                    let score = minimax(board, 0, false);
                    board[i] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            board[move] = 'o';
            document.querySelector(`.cell[data-index="${move}"]`).classList.add('o');
            if (checkWin()) {
                document.getElementById('status').textContent = `${player2} Wins!`;
                gameActive = false;
                highlightWinningCells();
                return;
            }
            if (board.every(cell => cell !== '')) {
                document.getElementById('status').textContent = "It's a Tie!";
                gameActive = false;
                return;
            }
            currentPlayer = 'x';
            updateStatus();
        }

        function minimax(board, depth, isMaximizing) {
            if (checkWinFor('o')) return 10 - depth;
            if (checkWinFor('x')) return depth - 10;
            if (board.every(cell => cell !== '')) return 0;

            if (isMaximizing) {
                let bestScore = -Infinity;
                for (let i = 0; i < board.length; i++) {
                    if (board[i] === '') {
                        board[i] = 'o';
                        let score = minimax(board, depth + 1, false);
                        board[i] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < board.length; i++) {
                    if (board[i] === '') {
                        board[i] = 'x';
                        let score = minimax(board, depth + 1, true);
                        board[i] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }
        }

        function checkWinFor(player) {
            return winningCombinations.some(combination => {
                return combination.every(index => board[index] === player);
            });
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'x';
            gameActive = true;
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('x', 'o', 'win-animation');
            });
            document.getElementById('startScreen').style.display = 'flex';
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('player1Name').value = '';
            document.getElementById('player2Name').value = '';
        }

        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
