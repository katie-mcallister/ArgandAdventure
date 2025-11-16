document.addEventListener('DOMContentLoaded', () => {
  const guidebookSidebar = document.getElementById('guidebookSidebar');
  guidebookSidebar.addEventListener('wheel', (e) => {
  const atTop = guidebookSidebar.scrollTop === 0;
  const atBottom = guidebookSidebar.scrollHeight - guidebookSidebar.scrollTop === guidebookSidebar.clientHeight;

  // Prevent page scroll ONLY when guidebook can scroll further
  if (!atTop && e.deltaY < 0) {
    e.stopPropagation();
  }
  if (!atBottom && e.deltaY > 0) {
    e.stopPropagation();
  }
});

  const mainContent = document.getElementById('mainContent');
  const openGuidebookBtn = document.getElementById('openGuidebookBtn');
  const closeGuidebookBtn = document.getElementById('closeGuidebookBtn');
  const questionPopup = document.getElementById("questionPopup");

  const guidebookTabs = document.querySelectorAll('.guidebookTab');
  const tabButtons = document.querySelectorAll('.guidebookTabBtn');

function toggleGuidebook() {
  const isOpen = guidebookSidebar.classList.contains('open');

  if (isOpen) {
    guidebookSidebar.classList.remove('open');
    mainContent.classList.remove('shifted');
    openGuidebookBtn.classList.remove('hidden');
    guidebookSidebar.setAttribute('aria-hidden', 'true');
    mainContent.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = ''; 

    if (questionPopup) {
      questionPopup.classList.remove('shifted');
    }
  } else {
    guidebookSidebar.classList.add('open');
    mainContent.classList.add('shifted');
    openGuidebookBtn.classList.add('hidden');
    guidebookSidebar.setAttribute('aria-hidden', 'false');
    mainContent.setAttribute('aria-hidden', 'true');

    if (questionPopup && questionPopup.style.display === "block") {
      questionPopup.classList.add('shifted');
    }
  }
}

  if (questionPopup) {
  if (guidebookSidebar.classList.contains('open')) {
    questionPopup.classList.add('shifted');
  } else {
    questionPopup.classList.remove('shifted');
  }
}
  openGuidebookBtn.addEventListener('click', toggleGuidebook);
  closeGuidebookBtn.addEventListener('click', toggleGuidebook);

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h" && !isIntroOpen) {
      toggleGuidebook();
    }
  });

  function unlockTabsByLevel(level) {
    guidebookTabs.forEach(tab => {
      const unlockLevel = parseInt(tab.dataset.unlockLevel || "0");
      tab.style.display = (level >= unlockLevel) ? 'block' : 'none';
    });

    tabButtons.forEach(btn => {
      const unlockLevel = parseInt(btn.dataset.unlockLevel || "0");
      btn.style.display = (level >= unlockLevel) ? 'inline-block' : 'none';
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.dataset.targetTab;
      guidebookTabs.forEach(tab => tab.style.display = 'none'); 
      const targetTab = document.getElementById(targetTabId);
      if (targetTab) targetTab.style.display = 'block'; 
    });
  });

  if (typeof levelNumber !== 'undefined') {
    unlockTabsByLevel(levelNumber);
    const firstUnlockedTab = Array.from(guidebookTabs).find(tab => levelNumber >= parseInt(tab.dataset.unlockLevel || "0"));
    if (firstUnlockedTab) {
      guidebookTabs.forEach(tab => tab.style.display = 'none'); 
      firstUnlockedTab.style.display = 'block'; 
    }
  }
});
