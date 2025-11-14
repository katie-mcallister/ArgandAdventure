function showPopup() {
  try {
    isPopupOpen = true;

    const popup = document.getElementById("questionPopup");
    const overlay = document.getElementById("overlay");
    const guidebookSidebar = document.getElementById("guidebookSidebar");

    if (popup) {
      popup.style.display = "block";

      if (guidebookSidebar && guidebookSidebar.classList.contains('open')) {
        popup.classList.add('shifted');
      } else {
        popup.classList.remove('shifted');
      }
    }

    if (overlay) overlay.style.display = "block";
    if (levelNumber === 2) {
      const rInput = document.getElementById("rInput");
      if (rInput) rInput.focus();
    } else {
      const answerInput = document.getElementById("answerInput");
      if (answerInput && answerInput.style.display !== "none") {
        answerInput.focus();
      }
    }

  } catch (err) {
    console.error("Error in showPopup():", err);
  }
}

function closePopup() {
  const popup = document.getElementById("questionPopup");
  const overlay = document.getElementById("overlay");

  if (popup) popup.style.display = "none";
  if (overlay) overlay.style.display = "none";

  currentTreasureIndex = null;
  currentCorrectRe = 0;
  currentCorrectIm = 0;
  isPopupOpen = false;

  keysHeld = {};

  if (levelNumber == 0){
    waitingForAnswer = false;
  }

  treasureClickEnabled = true;
}
function dimContent() {
  const mainWrapper = document.getElementById("mainWrapper");
  const guidebookSidebar = document.getElementById("guidebookSidebar");

  if (mainWrapper) mainWrapper.classList.add("dimmed");
  if (guidebookSidebar) guidebookSidebar.classList.add("dimmed");
}

function undimContent() {
  const mainWrapper = document.getElementById("mainWrapper");
  const guidebookSidebar = document.getElementById("guidebookSidebar");

  if (mainWrapper) mainWrapper.classList.remove("dimmed");
  if (guidebookSidebar) guidebookSidebar.classList.remove("dimmed");
}

