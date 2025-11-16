function preload() {
  gemImg = loadImage("https://cdn-icons-png.flaticon.com/128/6701/6701450.png");
  fragKeyImg = loadImage("https://cdn-icons-png.flaticon.com/128/2647/2647318.png");
  playerImg = loadImage("https://raw.githubusercontent.com/katie-mcallister/TestRepo/refs/heads/main/BenjiProj.png");
  towerImg = loadImage("https://cdn-icons-png.flaticon.com/128/3128/3128089.png");
  rockImg = loadImage('https://cdn-icons-png.flaticon.com/128/8722/8722137.png');
  bushImg = loadImage('https://cdn-icons-png.flaticon.com/128/12017/12017802.png');
  treeImg = loadImage('https://cdn-icons-png.flaticon.com/128/740/740936.png');
  enemyImg = loadImage ('https://cdn-icons-png.flaticon.com/128/4246/4246712.png')
  snowTreeImg = loadImage ('https://cdn-icons-png.flaticon.com/128/2309/2309703.png')
  shellImg = loadImage ('https://cdn-icons-png.flaticon.com/128/10541/10541642.png')
}

function setup() {
  let cnv = createCanvas((gridSize * 2 + 1) * scale, (gridSize * 2 + 1) * scale);
  cnv.parent('mainContent');

  if (levelNumber === 0) {
    generateTreasures(5);       
    generateObjects(0, 0, 20, 0); 
  }

  else if (levelNumber === 1) {
    generateTreasures(3);      
    generateObjects(20, 7, 0, 0);
    generateGrassBlades(gridSize, scale, bladesPerSquare);
    waitingForAnswer = true;
  }
  else if (levelNumber === 2) {
    generateTreasures(3);
    generateObjects(0, 0, 0, 35);       
    waitingForAnswer = true;
  }
  else if (levelNumber === 3) {
    generateTreasures(11); 
    generateObjects(0, 0, 0, 0);
    waitingForAnswer = true;
  }

const introPopup = document.getElementById("introPopup");
if (introPopup) {
  introPopup.style.display = "flex";
  dimContent(); 
  isIntroOpen = true; 
  document.body.style.overflow = "hidden";
}

document.getElementById("closeIntroBtn").addEventListener("click", () => {
  introPopup.style.display = "none";

  const introPopup2 = document.getElementById("introPopup2");
  if (introPopup2) introPopup2.style.display = "flex";
  isIntroOpen = true;
});

document.getElementById("closeIntroBtn2").addEventListener("click", () => {
  const introPopup2 = document.getElementById("introPopup2");
  if (introPopup2) introPopup2.style.display = "none";

  undimContent();

  isIntroOpen = false; 
  treasureClickEnabled = true;
    if (levelNumber === 1) {
    waitingForAnswer = true;   
  } else {
    waitingForAnswer = false;  
  }
  
  keysHeld = {};
  document.body.style.overflow = ""; 

});

  document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
  document.getElementById("closePopupBtn").addEventListener("click", () => {
    cancelAnswer();
  });

  const answerInput = document.getElementById("answerInput");

if (levelNumber === 0 || levelNumber === 1) {
  const answerInput = document.getElementById("answerInput");
  if (answerInput) {
    answerInput.addEventListener("input", () => {
      answerInput.value = answerInput.value.replace(/[^0-9+\-i\s]/gi, "");
      answerInput.value = answerInput.value.replace(/\s+/g, " ");
      answerInput.value = answerInput.value.replace(/\./g, ""); 
    });

    answerInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitAnswer();
      }
    });
  }
} else if (levelNumber === 2) {
  const rInput = document.getElementById("rInput");
  const thetaInput = document.getElementById("thetaInput");

  if (rInput) {
    rInput.addEventListener("input", () => {
      rInput.value = rInput.value.replace(/[^0-9]/g, ""); 
    });
    rInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitAnswer();
      }
    });
  }

  if (thetaInput) {
    thetaInput.addEventListener("input", () => {
      thetaInput.value = thetaInput.value.replace(/[^0-9.]/g, ""); 
    });
    thetaInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitAnswer();
      }
    });
  }
}

if (levelNumber === 3) {
    const rInput = document.getElementById("rInput");
    const thetaInput = document.getElementById("thetaInput");
    const answerInput = document.getElementById("answerInput");
    if (rInput) rInput.style.display = "none";
    if (thetaInput) thetaInput.style.display = "none";
    if (answerInput) answerInput.style.display = "none";

    const conceptualDiv = document.getElementById("conceptualQuestion");
    if (conceptualDiv) conceptualDiv.style.display = "block";
}

if (levelNumber === 3) {
    const conceptButtons = document.querySelectorAll(".conceptBtn");
    const feedbackMsg = document.getElementById("feedbackMsg");
    const errorMsg = document.getElementById("errorMsg");

    conceptButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const userChoice = btn.getAttribute("data-answer");


if (userChoice === "same") {
    feedbackMsg.style.display = "block";
    feedbackMsg.style.color = "green";
    feedbackMsg.textContent = "Correct!";
    errorMsg.textContent = "";
    treasuresCollected = treasures.length;
    waitingForAnswer = true;
    conceptQuestionAnswered = true;

    conceptButtons.forEach(b => b.style.display = "none");
    
    const submitBtn = document.getElementById("submitAnswer");
    if (submitBtn) submitBtn.style.display = "none";

    const answerInput = document.getElementById("answerInput");
    if (answerInput) answerInput.style.display = "none";

    connectionOrder = treasures.map(t => ({ x: t.re * scale, y: -t.im * scale }));
    connectAnimationProgress = 0;
    pulseOffset = 0;

    setTimeout(() => {
        closePopup();
        connectingTreasures = true;  
    }, 1500);

            } else {
                errorMsg.textContent = "Not quite — think about multiplying by the same factor repeatedly.";
                feedbackMsg.style.display = "none";
            }
        });
    });
}

const mainContent = document.getElementById('mainContent');
}

function showLevelCompletePopup() {
  const popup = document.getElementById('levelCompletePopup');
  if (!popup) return;

  popup.style.display = 'flex';
  dimContent();
  isIntroOpen = true;
  document.body.style.overflow = 'hidden';
}

function hideLevelCompletePopup() {
  const popup = document.getElementById('levelCompletePopup');
  if (!popup) return;

  popup.style.display = 'none';
  undimContent();
  isIntroOpen = false;
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', hideLevelCompletePopup);
  }
});

function keyPressed(event) {
  if (isIntroOpen || waitingForAnswer) return;
    if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(event.keyCode)) {
        keysHeld[event.keyCode] = true;
        event.preventDefault(); 
    }

    const char = event.key.toUpperCase();
    if (['W','A','S','D'].includes(char)) {
        keysHeld[char.charCodeAt(0)] = true;
        event.preventDefault();
    }
}

function keyReleased(event) {
  if (isIntroOpen || waitingForAnswer) return;
    if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(event.keyCode)) {
        keysHeld[event.keyCode] = false;
        event.preventDefault();
    }

    const char = event.key.toUpperCase();
    if (['W','A','S','D'].includes(char)) {
        keysHeld[char.charCodeAt(0)] = false;
        event.preventDefault();
    }
}

function movePlayerSmoothly(targetRe, targetIm, duration = 1000) {
  const startRe = player.re;
  const startIm = player.im;
  const startTime = millis();

  function step() {
    const elapsed = millis() - startTime;
    const t = constrain(elapsed / duration, 0, 1);

    player.re = lerp(startRe, targetRe, t);
    player.im = lerp(startIm, targetIm, t);

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      player.re = targetRe;
      player.im = targetIm;
    }
  }

  step();
}

function drawTreasures() {
  if (!Array.isArray(treasures) || treasures.length === 0) return;
  if (typeof scale === "undefined" || scale === 0) return;

  let treasureImg;
  if (levelNumber === 0) treasureImg = gemImg;
  else if (levelNumber === 1) treasureImg = fragKeyImg;
  else if (levelNumber === 2) treasureImg = enemyImg;
  else if (levelNumber === 3) treasureImg = shellImg;

  if (!treasureImg) return;

  let mouseOverAnyTreasure = false;
  if (typeof getTreasureAtMouse === "function") {
    const hovered = getTreasureAtMouse(mouseX, mouseY);
    if (hovered !== null) mouseOverAnyTreasure = true;
  }

  push();
  imageMode(CENTER);

 for (let i = 0; i < treasures.length; i++) {
  const t = treasures[i];
  if (!t) continue;
  const tx = t.re * scale;
  const ty = -t.im * scale;

  push();

  if (levelNumber === 3 && conceptQuestionAnswered) {
    tint(255);           // no hover effect
    image(treasureImg, tx, ty, 48, 48);
  } else if (levelNumber === 3 && !conceptQuestionAnswered) {
    if (mouseOverAnyTreasure) tint(255, 220, 150);
    else tint(255);
    image(treasureImg, tx, ty, 52, 52);
  } else {
    // existing hover logic for other levels
    if (typeof getTreasureAtMouse === "function" && getTreasureAtMouse(mouseX, mouseY) === i) {
      if (levelNumber === 2) tint(145, 217, 217);
      else if (levelNumber === 1) tint(255, 255, 0);
      image(treasureImg, tx, ty, 60, 60);
    } else {
      tint(255);
      image(treasureImg, tx, ty, 48, 48);
    }
  }

  pop();
}

  pop();
}


function draw() {
  let hoveringOverTreasure = false;
  let hoveringOverTower = false;

  background(255); 
  translate(width / 2, height / 2); 

  if (levelNumber !== 2 && !waitingForAnswer && !isIntroOpen) {
    if (millis() - lastHeldMove > moveInterval) {
      let newRe = player.re;
      let newIm = player.im;
      let moved = false;

      if (keysHeld[RIGHT_ARROW] || keysHeld['D'.charCodeAt(0)]) { newRe += 1; moved = true; }
      if (keysHeld[LEFT_ARROW]  || keysHeld['A'.charCodeAt(0)]) { newRe -= 1; moved = true; }
      if (keysHeld[UP_ARROW]    || keysHeld['W'.charCodeAt(0)]) { newIm += 1; moved = true; }
      if (keysHeld[DOWN_ARROW]  || keysHeld['S'.charCodeAt(0)]) { newIm -= 1; moved = true; }

      if (moved) {
        newRe = constrain(newRe, -gridSize, gridSize);
        newIm = constrain(newIm, -gridSize, gridSize);

        player.re = newRe;
        player.im = newIm;

        lastMoveTime = millis();
        lastHeldMove = millis();

        cancelledTreasureIndex = null;
        cancelledTower = false;
      }
    }
  }

  drawGridSquares();
  drawGridLines();

  if (levelNumber === 0 && rocks && rocks.length > 0 && rockImg) {
    drawTreasures();
    push();
    imageMode(CENTER);
    tint(255, 191);
    for (let rock of rocks) {
      push();
      translate(rock.re * scale, -rock.im * scale);
      image(rockImg, 0, 0, rock.size, rock.size);
      pop();
    }
    pop();
  }

  if (levelNumber === 1) {
    if (typeof grassBlades !== 'undefined' && grassBlades.length > 0) drawGrass();

    if (bushes && bushes.length > 0 && bushImg) {
      push(); imageMode(CENTER); tint(255, 191);
      for (let bush of bushes) {
        push(); translate(bush.re * scale, -bush.im * scale);
        image(bushImg, 0, 0, bush.size || 30, bush.size || 30);
        pop();
      }
      pop();
    }

    if (trees && trees.length > 0 && treeImg) {
      push(); imageMode(CENTER); tint(255, 191);
      for (let tree of trees) {
        push(); translate(tree.re * scale, -tree.im * scale);
        image(treeImg, 0, 0, tree.size || 55, tree.size || 55);
        pop();
      }
      pop();
    }
        drawTreasures();
  }

  if (levelNumber === 2) {
    drawTreasures();
    if (snowTrees && snowTrees.length > 0 && snowTreeImg) {
      push(); imageMode(CENTER); tint(255, 130);
      for (let snowTree of snowTrees) {
        push(); translate(snowTree.re * scale, -snowTree.im * scale);
        image(snowTreeImg, 0, 0, snowTree.size || 30, snowTree.size || 30);
        pop();
      }
      pop();
    }
  }

  if (levelNumber === 3) {
    drawTreasures();
  }

  if (connectingTreasures && connectionOrder.length > 1) {
    push(); noFill(); strokeWeight(4);
    pulseOffset += 0.05;

    for (let i = 0; i < connectionOrder.length - 1; i++) {
      const start = connectionOrder[i], end = connectionOrder[i+1];
      const alpha = 150 + 100 * sin(pulseOffset + i);
      stroke(255, 200, 155, alpha);
      line(start.x, start.y, end.x, end.y);
    }

    connectAnimationProgress += 0.002;
    const totalLines = connectionOrder.length - 1;
    const linesToDraw = Math.floor(totalLines * connectAnimationProgress);

    if (linesToDraw < totalLines) {
      const start = connectionOrder[linesToDraw];
      const end = connectionOrder[linesToDraw + 1];
      const t = (connectAnimationProgress * totalLines) % 1;
      const currX = lerp(start.x, end.x, t);
      const currY = lerp(start.y, end.y, t);
      stroke(255, 255, 100, 200);
      line(start.x, start.y, currX, currY);
    }

if (connectAnimationProgress >= 1) {
    connectingTreasures = false;

    const levelCompletePopup = document.getElementById("levelCompletePopup");
    if (levelCompletePopup) {
        levelCompletePopup.style.display = "flex";
        dimContent();
        document.body.style.overflow = "hidden"; 
        const continueBtn = document.getElementById("continueBtn");
        if (continueBtn) {
            continueBtn.replaceWith(continueBtn.cloneNode(true));
            const newContinueBtn = document.getElementById("continueBtn");
            newContinueBtn.addEventListener("click", () => {
                window.location.href = "index4.html";
            });
        }
    }
}

    pop();
  }

  if (levelNumber >= 1) {
    const hoveredTreasure = getTreasureAtMouse(mouseX, mouseY);
    if (hoveredTreasure !== null) hoveringOverTreasure = true;
  }

  if (levelNumber === 1) {
    const towerX = towerPosition.re * scale;
    const towerY = -towerPosition.im * scale;
    const baseSize = 100;
    const localMouseX = mouseX - width / 2;
    const localMouseY = mouseY - height / 2;

    if (
      localMouseX > towerX - baseSize / 2 &&
      localMouseX < towerX + baseSize / 2 &&
      localMouseY > towerY - baseSize / 2 &&
      localMouseY < towerY + baseSize / 2
    ) hoveringOverTower = true;
  }

  if (hoveringOverTreasure || hoveringOverTower) cursor(HAND);
  else cursor(ARROW);

  if (levelNumber === 1) {
    const towerX = towerPosition.re * scale;
    const towerY = -towerPosition.im * scale;
    const baseSize = 100;
    let displaySize = baseSize;
    if (treasuresCollected >= 3) {
      towerPulseTime += 0.05;
      displaySize = baseSize * (1 + towerPulseAmplitude * sin(TWO_PI * towerPulseTime * towerPulseSpeed));
    }

    push();
    imageMode(CENTER);
    image(towerImg, towerX, towerY, displaySize, displaySize);
    pop();
  }

  drawAxisLabels();

  let shakeX = 0, shakeY = 0;
  let timeSinceMove = millis() - lastMoveTime;
  if (timeSinceMove < shakeDuration) {
    let shakeProgress = map(timeSinceMove, 0, shakeDuration, 0, TWO_PI);
    shakeX = shakeAmplitude * sin(shakeProgress);
    shakeY = shakeAmplitude * cos(shakeProgress * 1.5);
  }

  let px = player.re * scale + shakeX;
  let py = -player.im * scale + shakeY;
  push();
  imageMode(CENTER);
  image(playerImg, px, py, 75, 60);
  pop();

  resetMatrix();

  if (!waitingForAnswer && !towerCompleted) {
    for (let i = 0; i < treasures.length; i++) {
      let t = treasures[i];
      if (player.re === t.re && player.im === t.im && i !== cancelledTreasureIndex) {
        askQuestion(i);
        return;
      }
    }
  }

  if (levelNumber === 1 && player.re === towerPosition.re && player.im === towerPosition.im) {
    if (!towerCompleted) {
      if (treasuresCollected < 3) {
        if (!cancelledTower && !waitingForAnswer && !isPopupOpen) showTowerLockedPopup();
      } else {
        if (!cancelledTower && !waitingForAnswer && !isPopupOpen) askTowerQuestion();
      }
    }
  }
}

function mousePressed() {
  if (levelNumber === 3 && conceptQuestionAnswered) return;
  if (levelNumber === 0) return;

  if (!treasureClickEnabled || isPopupOpen) return; 

  const towerX = towerPosition.re * scale + width / 2;
  const towerY = -towerPosition.im * scale + height / 2;
  const towerSize = 100; 

  if (
    mouseX > towerX - towerSize / 2 &&
    mouseX < towerX + towerSize / 2 &&
    mouseY > towerY - towerSize / 2 &&
    mouseY < towerY + towerSize / 2
  ) {
    if (treasuresCollected < 3) {
      showTowerLockedPopup(); 
    } else {
      askTowerQuestion(); 
    }
    return; 
  }

  const treasureIndex = getTreasureAtMouse(mouseX, mouseY);
  if (treasureIndex !== null) {
    askQuestion(treasureIndex); 
    treasureClickEnabled = false; 
  }
}

function drawGridSquares() {
  if (levelNumber === 0) {
    fill(156,156,156);
  }

  else if (levelNumber === 1) {
    fill(81, 149, 51);
  }

  else if (levelNumber === 2) {
    fill(218, 237, 240);
  }

  else if (levelNumber === 3) {
    fill(247, 226, 147);
  }

  rectMode(CORNER);
  noStroke();

  for (let x = -gridSize; x < gridSize; x++) {
    for (let y = -gridSize; y < gridSize; y++) {
      let px = x * scale;
      let py = -y * scale - scale; 
      rect(px, py, scale, scale);
    }
  }
}

function drawGridLines() {
  if (levelNumber === 0) {
    stroke(122,122,122);  
  }

  else if (levelNumber === 1) {
    stroke(255, 255, 255, 120);
  }

  else if (levelNumber === 2) {
    stroke(255, 255, 255, 120);
  }

  else if (levelNumber === 3) {
    stroke(255, 255, 255, 120);
  }


  for (let x = -gridSize; x <= gridSize; x++) {
    line(x * scale, -gridSize * scale, x * scale, gridSize * scale);
  }
  for (let y = -gridSize; y <= gridSize; y++) {
    line(-gridSize * scale, y * scale, gridSize * scale, y * scale);
  }

  stroke('#000000ff');
  strokeWeight(3);
  
  line(-gridSize * scale, 0, gridSize * scale, 0);
  line(0, -gridSize * scale, 0, gridSize * scale);
  
  push();
  fill('#000000ff');
  noStroke();
  let arrowSize = 10;
  let xArrowX = gridSize * scale +5;
  let xArrowY = 0;
  translate(xArrowX, xArrowY);
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();

  push();
  fill('#000000ff');
  noStroke();
  let yArrowX = 0;
  let yArrowY = -gridSize * scale -5;
  translate(yArrowX, yArrowY);
  triangle(0, 0, -arrowSize / 2, arrowSize, arrowSize / 2, arrowSize);
  pop();

  strokeWeight(1);
}

function drawAxisLabels() {
  push();
  resetMatrix();

  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);

  stroke('#000000ff');      
  strokeWeight(3);    
  fill(255);

  for (let x = -gridSize; x <= gridSize; x++) {
    if (x === 0) continue;
    text(x, width / 2 + x * scale, height / 2 + 15); 
  }

  for (let y = -gridSize; y <= gridSize; y++) {
    if (y === 0) continue;
    let labelX = width / 2 - 15;         
    let labelY = height / 2 - y * scale; 
    text(y + "i", labelX, labelY);         
  }

  textAlign(LEFT, TOP);
  text("0", width / 2 + 5, height / 2 + 5);

  pop();
}