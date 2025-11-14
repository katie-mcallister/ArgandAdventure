function generateTreasures(n) {
  treasures = [];
  let positions = new Set();

  function randInt(min, max) {
    return Math.floor(random(min, max + 1));
  }

  if (levelNumber === 0) {
    while (treasures.length < 3) {
      let re, im;
      if (treasures.length === 0) {
        re = randInt(1, gridSize - 1);
        im = randInt(1, gridSize - 1);
      } else if (treasures.length === 1) {
        re = randInt(-gridSize + 1, -1);
        im = randInt(1, gridSize - 1);
      } else if (treasures.length === 2) {
        re = randInt(-gridSize + 1, -1);
        im = randInt(-gridSize + 1, -1);
      } else if (treasures.length === 3) {
        re = randInt(1, gridSize - 1);
        im = randInt(-gridSize + 1, -1);
      }
      addTreasure(re, im);
    }

    while (treasures.length < n) {
      let re = randInt(-(gridSize - 1), gridSize - 1);
      let im = randInt(-(gridSize - 1), gridSize - 1);
      if (re === 0 && im === 0) continue;
      addTreasure(re, im);
    }

  } else if (levelNumber === 1) {
    while (treasures.length < n) {
      let re = int(random(-(gridSize - 1), gridSize));
      let im = int(random(-(gridSize - 1), gridSize));
      let key = `${re},${im}`;

      if (
        (re === 0 && im === 0) ||
        (re === towerPosition.re && im === towerPosition.im) ||
        positions.has(key) ||
        (re > 0 && im < 0)
      ) {
        continue;
      }

      positions.add(key);
      let type = random() < 0.5 ? "add" : "subtract";
      treasures.push({ re, im, type });
    }
    
  }
else if (levelNumber === 2) {
    while (treasures.length < n) {
        let re = int(random(-(gridSize - 1), gridSize)); 
        let im = int(random(0, gridSize - 1)); 
        let key = `${re},${im}`;

        if ((re === 0 && im === 0) || positions.has(key)) continue;

        positions.add(key);
        treasures.push({ re, im }); 
    }
}

else if (levelNumber === 3) {
  treasures = [];

  let angle = 0;            
  let radius = 0.8;         
  const growth = 1.2; 
  const step = 35;         
  const rotation = 315;    

  for (let i = 0; i < n; i++) {
    const theta = radians(angle + rotation);
    const re = radius * Math.cos(theta);
    const im = radius * Math.sin(theta);
    treasures.push({ re, im });

    angle += step;
    radius *= growth;
  }
}

  function addTreasure(re, im) {
    const key = `${re},${im}`;
    if (positions.has(key) || (re === 0 && im === 0)) return false;
    positions.add(key);
    treasures.push({ re, im });
    return true;
  }
}
