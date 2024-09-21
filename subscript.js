// script.js
document.addEventListener('DOMContentLoaded', () => {
    const scoreForm = document.getElementById('scoreForm');
    const loadScoreButton = document.getElementById('loadScore');
    const resetButton = document.getElementById('resetLeaderboard');

    loadScoreButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        if (!name) {
            alert('점수를 불러오려면 이름을 적어주세요.');
            return;
        }

        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const existingScore = scores.find(score => score.name === name);

        if (existingScore) {
            document.getElementById('score1').value = existingScore.score1;
            document.getElementById('score2').value = existingScore.score2;
        } else {
            alert('해당 유저에게 주어진 점수가 없습니다.');
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

        alert('점수가 업데이트되었습니다.');
        scoreForm.reset();
    });

    resetButton.addEventListener('click', () => {
        localStorage.removeItem('scores');
        alert('리더보드가 초기화되었습니다.');
    });
});