// script.js
document.addEventListener('DOMContentLoaded', () => {
    const scoreForm = document.getElementById('scoreForm');
    const loadScoreButton = document.getElementById('loadScore');
    const resetButton = document.getElementById('resetLeaderboard');

    loadScoreButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        if (!name) {
            alert('Please enter a name to load the score.');
            return;
        }

        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const existingScore = scores.find(score => score.name === name);

        if (existingScore) {
            document.getElementById('score1').value = existingScore.score1;
            document.getElementById('score2').value = existingScore.score2;
        } else {
            alert('No score found for the given name.');
        }
    });

    scoreForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(scoreForm);
        const data = {
            name: formData.get('name'),
            score1: parseInt(formData.get('score1')),
            score2: parseInt(formData.get('score2')),
            totalScore: parseInt(formData.get('score1')) + parseInt(formData.get('score2'))
        };

        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        const existingIndex = scores.findIndex(score => score.name === data.name);

        if (existingIndex !== -1) {
            scores[existingIndex] = data; // Update existing score
        } else {
            scores.push(data); // Add new score
        }

        scores.sort((a, b) => b.totalScore - a.totalScore); // Sort by total score descending
        localStorage.setItem('scores', JSON.stringify(scores));

        alert('Score submitted successfully!');
        scoreForm.reset();
    });

    resetButton.addEventListener('click', () => {
        localStorage.removeItem('scores');
        alert('Leaderboard has been reset.');
    });
});