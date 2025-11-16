function submitAnswer() {
  const errorMsg = document.getElementById("errorMsg");
  const feedbackMsg = document.getElementById("feedbackMsg");

  errorMsg.textContent = "";
  feedbackMsg.style.display = "none";
  feedbackMsg.textContent = "";

  if (levelNumber === 0 || levelNumber === 1) {
    const inputEl = document.getElementById("answerInput");
    if (!inputEl) {
      console.error("answerInput not found for level", levelNumber);
      return;
    }

    const input = inputEl.value.trim();
    if (input === "") {
      errorMsg.style.color = "red";
      errorMsg.textContent = "No input, please enter an answer.";
      return;
    }

    const regex = /^\s*([-+]?\d+)\s*([+-])\s*(\d+)\s*i\s*$/i;
    const match = input.match(regex);

    if (!match) {
      errorMsg.style.color = "red";
      errorMsg.textContent = "Invalid format, use: x + yi (e.g. 3 + 4i)";
      return;
    }

    let userRe = Number(match[1].trim());
    let sign = match[2].trim();
    let userIm = Number(match[3].trim());
    if (sign === "-") userIm = -userIm;

    if (levelNumber === 0) {
      if (userRe === currentCorrectRe && userIm === currentCorrectIm) {
        feedbackMsg.style.display = "block";
        feedbackMsg.style.color = "green";
        feedbackMsg.textContent = "Correct!";
        inputEl.style.display = "none";
        document.getElementById("submitAnswer").style.display = "none";

        if (currentTreasureIndex !== null) {
          treasures.splice(currentTreasureIndex, 1);
          treasuresCollected++;
          currentTreasureIndex = null;
        }

        setTimeout(() => {
          closePopup();
          if (treasuresCollected >= 5) {
            const levelCompletePopup = document.getElementById("levelCompletePopup");
            if (levelCompletePopup) levelCompletePopup.style.display = "flex";

            const continueBtn = document.getElementById("continueBtn");
            if (continueBtn) {
              continueBtn.addEventListener("click", () => {
                window.location.href = "index1.html"; 
              });
            }
          }
        }, 1500);
      } else {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Incorrect answer, try again!";
      }
      return;
    }

if (levelNumber === 1) {
  if (userRe === currentCorrectRe && userIm === currentCorrectIm) {
    feedbackMsg.style.display = "block";
    feedbackMsg.style.color = "green";
    feedbackMsg.textContent = "Correct!";

    inputEl.style.display = "none";
    document.getElementById("submitAnswer").style.display = "none";

    if (currentTreasureIndex !== null) {
      const treasure = treasures[currentTreasureIndex];

      setTimeout(() => {
        movePlayerSmoothly(treasure.re, treasure.im, 500);

        setTimeout(() => {
          const idx = treasures.indexOf(treasure);
          if (idx !== -1) treasures.splice(idx, 1);
          treasuresCollected++;
          treasureClickEnabled = true;
          waitingForAnswer = true;
          closePopup();
        }, 550);

      }, 800);

    } else {

      setTimeout(() => {
        feedbackMsg.textContent = "";
        feedbackMsg.style.display = "none";

        towerCompleted = true;
        waitingForAnswer = false;
        isPopupOpen = false;
        treasureClickEnabled = false;

        const levelCompletePopup = document.getElementById("levelCompletePopup");
        if (levelCompletePopup) {
          levelCompletePopup.style.display = "flex";
          dimContent();
          document.body.style.overflow = "hidden";

          const continueBtn = document.getElementById("continueBtn");
          if (continueBtn) {
            continueBtn.addEventListener("click", () => {
              window.location.href = "index2.html";
            });
          }
        }
      }, 1200);

    }

  } else {
    errorMsg.style.color = "red";
    errorMsg.textContent = "Incorrect answer, try again!";
  }
  return;
}
  }


if (levelNumber === 2) {
  const rInputEl = document.getElementById("rInput");
  const thetaInputEl = document.getElementById("thetaInput");
  

  if (!rInputEl || !thetaInputEl) {
    console.error("Level 2 inputs not found!");
    return;
  }

  const rValue = rInputEl.value.trim();
  const thetaValue = thetaInputEl.value.trim();

  if (rValue === "" || thetaValue === "") {
    errorMsg.style.color = "red";
    errorMsg.textContent = "Please enter values for r and θ.";
    return;
  }

  const studentR = parseFloat(rValue);
  const studentTheta = parseFloat(thetaValue);

  if (isNaN(studentR) || isNaN(studentTheta)) {
    errorMsg.style.color = "red";
    errorMsg.textContent = "Please enter valid numbers for r and θ.";
    return;
  }

  const rDiff = Math.abs(studentR - currentCorrectR);
  const thetaDiff = Math.abs(studentTheta - currentCorrectTheta);

  if (rDiff < 0.001 && thetaDiff < 0.5) {
    feedbackMsg.style.display = "block";
    feedbackMsg.style.color = "green";
    feedbackMsg.textContent = "Correct!";

    if (currentTreasureIndex !== null) {
      treasures.splice(currentTreasureIndex, 1);
      currentTreasureIndex = null;
    }

    waitingForAnswer = false;
    treasuresCollected++;

    rInputEl.value = "";
    thetaInputEl.value = "";
    document.getElementById("polarInputs").style.display = "none";

    setTimeout(() => {
      closePopup();

      if (treasures.length === 0) {
        const levelCompletePopup = document.getElementById("levelCompletePopup");
        if (levelCompletePopup) {
          levelCompletePopup.style.display = "flex";
          dimContent();
          isIntroOpen = true;
          document.body.style.overflow = "hidden";

          const continueBtn = document.getElementById("continueBtn");
          if (continueBtn) {
            continueBtn.addEventListener("click", () => {
              window.location.href = "index3.html";
            });
          }
        }
      }
    }, 1200);
  } else {
    let msg = "";
    if (rDiff >= 0.001 && thetaDiff >= 0.5) {
      msg = "Both r and θ are incorrect.";
    } else if (rDiff >= 0.001) {
      msg = "r is incorrect.";
    } else if (thetaDiff >= 0.5) {
      msg = "θ is incorrect.";
    }

    errorMsg.style.color = "red";
    errorMsg.textContent = msg;
  }
}
}

function cancelAnswer() {
  if (currentTreasureIndex !== null) {
    cancelledTreasureIndex = currentTreasureIndex;
    currentTreasureIndex = null;
    treasureClickEnabled = true;
  } else {
    cancelledTower = true;
  }

  if (levelNumber === 0) {
    waitingForAnswer = false;
  }

  closePopup();
}

