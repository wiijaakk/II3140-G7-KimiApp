document.addEventListener('DOMContentLoaded', function() {
  const totalSections = 4;
  let openedSections = new Set();

  const progressBar = document.getElementById('theory-progress-bar');
  const progressText = document.getElementById('theory-progress-text');

  function updateProgress() {
    const progressPercent = (openedSections.size / totalSections) * 100;
    if (progressBar && progressText) {
      progressBar.style.width = progressPercent + '%';
      progressText.textContent = Math.round(progressPercent) + '% Selesai';
    }
    saveProgressToServer();
  }

  async function saveProgressToServer() {
    try {
      const sectionsArray = Array.from(openedSections);
      const response = await fetch('save_progress.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completedSections: sectionsArray
        }),
        credentials: 'same-origin'
      });
      
      const data = await response.json();
      console.log('Server response:', data);
      if (!response.ok) {
        console.error('Gagal menyimpan progress');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

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
        openedSections.forEach(section => {
          const content = document.getElementById('content-' + section);
          const expandIcon = document.getElementById('expand-' + section);
          if (content && expandIcon) {
            content.classList.remove('hidden');
            expandIcon.classList.add('expanded');
          }
        });
        updateProgress();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }

  loadProgressFromServer();

  if (openedSections.size === 0) {
    document.getElementById('content-basics').classList.remove('hidden');
    document.getElementById('expand-basics').classList.add('expanded');
    openedSections.add('basics');
    updateProgress();
  }

  document.getElementById('section-basics').addEventListener('click', function() {
    toggleSection('basics');
  });

  document.getElementById('section-reactions').addEventListener('click', function() {
    toggleSection('reactions');
  });

  document.getElementById('section-colors').addEventListener('click', function() {
    toggleSection('colors');
  });

  document.getElementById('section-safety').addEventListener('click', function() {
    toggleSection('safety');
  });

  function toggleSection(sectionId) {
    const content = document.getElementById('content-' + sectionId);
    const expandIcon = document.getElementById('expand-' + sectionId);

    if (content.classList.contains('hidden')) {
      document.querySelectorAll('.card-content').forEach(function(el) {
        el.classList.add('hidden');
      });
      document.querySelectorAll('.expand-icon').forEach(function(el) {
        el.classList.remove('expanded');
      });

      content.classList.remove('hidden');
      expandIcon.classList.add('expanded');

      openedSections.add(sectionId);
      updateProgress();

    } else {
      content.classList.add('hidden');
      expandIcon.classList.remove('expanded');
    }
  }
});