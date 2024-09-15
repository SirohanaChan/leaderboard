// script.js
document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];

    function fetchScores() {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const rows = Array.from(leaderboard.rows);

        // Create a map of current row positions
        const rowPositions = new Map();
        rows.forEach((row, index) => {
            rowPositions.set(row.cells[1].textContent, index);
        });

        // Sort scores and update the leaderboard
        scores.sort((a, b) => b.totalScore - a.totalScore);
        leaderboard.innerHTML = '';
        scores.forEach((score, index) => {
            const row = leaderboard.insertRow();
            row.style.transform = `translateY(${index}%)`;
            row.insertCell(0).textContent = index + 1;
            row.cells[0].classList.add('rank');
            row.insertCell(1).textContent = score.name;
            row.cells[1].classList.add('name');
            row.insertCell(2).textContent = ''; // Empty cell to create the separation
            row.insertCell(3).textContent = score.score1;
            row.cells[3].classList.add('live');
            row.insertCell(4).textContent = score.score2;
            row.cells[4].classList.add('kill');
            row.insertCell(5).textContent = score.totalScore;
            row.cells[5].classList.add('total');

            // Apply animation if the row position has changed
            const previousIndex = rowPositions.get(score.name);
            if (previousIndex !== undefined && previousIndex !== index) {
                row.style.transition = 'transform 1s ease-in-out';
                row.style.transform = `translateY(${(previousIndex - index) * 100}%)`;
                setTimeout(() => {
                    row.style.transform = `translateY(0)`;
                }, 0);
            }
        });
    }

    setInterval(fetchScores, 1500); // Fetch scores every 5 seconds
});
