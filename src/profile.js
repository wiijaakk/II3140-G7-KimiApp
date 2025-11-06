document.addEventListener('DOMContentLoaded', function() {
    const totalSections = 4; 
    let openedSections = new Set();
    async function loadProgressFromServer() {
        try {
        const response = await fetch('save_progress.php', {
            method: 'GET',
            credentials: 'same-origin'
        });
        const data = await response.json();
        
        if (!data.ok) {
            console.error('Gagal memuat progress:', data.msg);
        }
        
        if (data.ok && data.completedSections) {
            openedSections = new Set(data.completedSections);
            updateProgress();
        }
        } catch (error) {
        console.error('Error loading progress:', error);
        }
    }

    let progressPercent = 0;
    function updateProgress() {
        const progressPercent = (openedSections.size / totalSections) * 100;
        const progressBar = document.getElementById('theory-progress-bar');
        const progressText = document.getElementById('theory-progress-text');
        
        if (progressBar && progressText) {
            progressBar.style.width = progressPercent + '%';
            progressText.textContent = Math.round(progressPercent) + '% Selesai';
        }   
    }
    loadProgressFromServer();
});