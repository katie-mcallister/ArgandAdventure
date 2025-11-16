function getTreasureAtMouse(mx, my) {
  if (levelNumber === 3 && conceptQuestionAnswered) return null;

  const x = mx - width / 2;
  const y = my - height / 2;

  for (let i = 0; i < treasures.length; i++) {
    const t = treasures[i];
    const tx = t.re * scale;
    const ty = -t.im * scale;

    if (
      x > tx - scale * 0.5 &&
      x < tx + scale * 0.5 &&
      y > ty - scale * 0.5 &&
      y < ty + scale * 0.5
    ) {
      return i;
    }
  }
  return null;
}