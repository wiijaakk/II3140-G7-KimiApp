const indicatorData = {
    'fenolftalein': {
        name: 'Fenolftalein',
        ph: '8.3 - 10.0',
        colors: {
            'hcl': { color: '#FFFFFF', name: 'Tidak berwarna', border: '1px solid #ccc' },
            'h2o': { color: '#FFFFFF', name: 'Tidak berwarna', border: '1px solid #ccc' },
            'naoh': { color: '#FF69B4', name: 'Merah Muda' }
        },
        explanation: {
            'hcl': 'Fenolftalein tidak berubah warna di lingkungan asam (HCl). Indikator ini hanya berubah warna di lingkungan basa dengan pH > 8.3.',
            'h2o': 'Fenolftalein tidak berubah warna di lingkungan netral (H₂O). Indikator ini memerlukan pH yang cukup tinggi untuk menunjukkan warna merah muda.',
            'naoh': 'Fenolftalein berubah menjadi merah muda di lingkungan basa (NaOH). Ini menunjukkan bahwa pH larutan berada di atas 8.3.'
        }
    },
    'metil-jingga': {
        name: 'Metil Jingga (Methyl Orange)',
        ph: '3.1 - 4.4',
        colors: {
            'hcl': { color: '#FF4444', name: 'Merah' },
            'h2o': { color: '#FF8C00', name: 'Orange' },
            'naoh': { color: '#FFD700', name: 'Kuning' }
        },
        explanation: {
            'hcl': 'Metil jingga berubah menjadi merah di lingkungan asam kuat (HCl). Ini menunjukkan pH yang sangat rendah (< 3.1).',
            'h2o': 'Metil jingga menunjukkan warna orange di lingkungan netral (H₂O). Ini adalah warna transisi antara asam dan basa.',
            'naoh': 'Metil jingga berubah menjadi kuning di lingkungan basa (NaOH). Ini menunjukkan bahwa pH larutan berada di atas 4.4.'
        }
    },
    'bromtimol-biru': {
        name: 'Bromtimol Biru (Bromothymol Blue)',
        ph: '6.0 - 7.6',
        colors: {
            'hcl': { color: '#FFD700', name: 'Kuning' },
            'h2o': { color: '#00AA00', name: 'Hijau' },
            'naoh': { color: '#4169E1', name: 'Biru' }
        },
        explanation: {
            'hcl': 'Bromtimol biru berubah menjadi kuning di lingkungan asam (HCl). Ini menunjukkan pH yang rendah (< 6.0).',
            'h2o': 'Bromtimol biru menunjukkan warna hijau di lingkungan netral (H₂O). Ini adalah titik transisi sempurna untuk pH netral.',
            'naoh': 'Bromtimol biru berubah menjadi biru di lingkungan basa (NaOH). Ini menunjukkan bahwa pH larutan berada di atas 7.6.'
        }
    }
};

const solutionData = {
    'hcl': { name: 'HCl (Asam Klorida)', type: 'Asam' },
    'h2o': { name: 'H₂O (Air)', type: 'Netral' },
    'naoh': { name: 'NaOH (Natrium Hidroksida)', type: 'Basa' }
};

let selectedSolution = null;
let selectedIndicator = null;

document.querySelectorAll('.solution-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.solution-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedSolution = this.dataset.solution;
        document.getElementById('selected-solution').textContent = `Larutan dipilih: ${solutionData[selectedSolution].name}`;
        showResultIfReady();
    });
});

document.querySelectorAll('.indicator-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.indicator-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedIndicator = this.dataset.indicator;
        document.getElementById('selected-indicator').textContent = `Indikator dipilih: ${indicatorData[selectedIndicator].name}`;
        showResultIfReady();
    });
});

function showResultIfReady() {
    if (selectedSolution && selectedIndicator) {
        displayResult();
    }
}

function displayResult() {
    const resultSection = document.getElementById('result-section');
    const indicator = indicatorData[selectedIndicator];
    const solution = solutionData[selectedSolution];
    const colorData = indicator.colors[selectedSolution];

    document.getElementById('result-solution').textContent = solution.name;
    document.getElementById('result-indicator').textContent = indicator.name;
    document.getElementById('result-ph').textContent = indicator.ph;
    document.getElementById('result-explanation').textContent = indicator.explanation[selectedSolution];

    const testTube = document.getElementById('test-tube');
    testTube.style.color = colorData.color;
    if (colorData.border) {
        testTube.style.border = `3px solid ${colorData.border}`;
    } else {
        testTube.style.border = '3px solid var(--dark-blue)';
    }

    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}