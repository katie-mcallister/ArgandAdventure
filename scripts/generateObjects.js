function generateObjects(numBushes, numTrees, numRocks, numSnowTrees) {
  bushes = [];
  trees = [];
  rocks = [];
  snowTrees = [];

  const positions = new Set();

  function isFreePosition(x, y) {
    if (x === 0 && y === 0) return false; 
    if (x === towerPosition.re && y === towerPosition.im) return false;
    for (let t of treasures) {
      if (t.re === x && t.im === y) return false; 
    }
    if (positions.has(`${x},${y}`)) return false; 
    return true;
  }

 function placeObjects(targetArray, count, sizeRange) {
  while (targetArray.length < count) {
    const size = random(sizeRange.min, sizeRange.max);
    const sizeInGridUnits = size / scale / 2; 

    const minCoord = -gridSize + sizeInGridUnits;
    const maxCoord = gridSize - sizeInGridUnits;

    const x = random(minCoord, maxCoord);
    const y = random(minCoord, maxCoord);

    const gridX = int(x);
    const gridY = int(y);

    if (isFreePosition(gridX, gridY)) {
      const offsetX = random(-0.4, 0.4);
      const offsetY = random(-0.4, 0.4);

      targetArray.push({
        re: gridX + offsetX,
        im: gridY + offsetY,
        size,
      });

      positions.add(`${gridX},${gridY}`);
    }
  }
}

  if (levelNumber === 0) {
    placeObjects(rocks, numRocks, { min: 25, max: 50 });
  } else if (levelNumber === 1) {
    placeObjects(bushes, numBushes, { min: 20, max: 35 });
    placeObjects(trees, numTrees, { min: 45, max: 70 });
  } else if (levelNumber === 2){
    placeObjects(snowTrees, numSnowTrees, {min: 30, max: 40});
  }
}
