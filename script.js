window.addEventListener('load', () => {
  // Found some code on stackoverflow about how HTML5 and Canvas
  // Came before high pixel density displays

  function createHiPPICanvas(w, h) {
    const ratio = window.devicePixelRatio;
    const cv = document.createElement('canvas');
    cv.width = w * ratio;
    cv.height = h * ratio;
    cv.style.width = `${w}px`;
    cv.style.height = `${h}px`;
    cv.getContext('2d').scale(ratio, ratio);
    return cv;
  }

  // Load full image to get processed
  // This will be inside the function to edit picture on submit button action
  const fullIMG = new Image();
  fullIMG.src = 'template.png';

  const canvas = createHiPPICanvas(fullIMG.width, fullIMG.height);
  const ctx = canvas.getContext('2d');

  // Populates the canvas with the image
  ctx.drawImage(fullIMG, 0, 0);

  // Sets the canvas font in pixels and the font-family
  ctx.font = '50px serif';

  // Trainee name
  const traineeName = 'Edward Lopez-Ramos';
  const nameWidth = ctx.measureText(traineeName).width;
  const nameCenter = fullIMG.width / 2 - nameWidth / 2;
  ctx.fillText(traineeName, nameCenter, 750);

  // Date of completion
  ctx.fillText('09/12/2021', 975, 1075);

  // Displays the changed image
  // Can be removed or changed into a preview image before download
  const finalProduct = document
    .getElementById('completedImage')
    .appendChild(canvas);
});
