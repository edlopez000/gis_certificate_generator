window.addEventListener('load', () => {
  // Get current date and add it as a max attribute for the date input
  function setDate() {
    const dateSelector = document.getElementById('date');
    const maxDate = new Date().toISOString().split('T')[0];
    dateSelector.setAttribute('value', maxDate);
    dateSelector.setAttribute('max', maxDate);
  }

  setDate();

  // Load full image to get processed
  // This will be inside the function to edit picture on submit button action
  const fullIMG = new Image();
  // fullIMG.src = 'template.png';
  fullIMG.src = 'template_w_sig.png';

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

  // Creates the context for the canvas
  const canvas = createHiPPICanvas(fullIMG.width, fullIMG.height);
  const ctx = canvas.getContext('2d');

  // Populates the canvas with the image and also clears the canvas
  function clearAndDraw() {
    ctx.drawImage(fullIMG, 0, 0);
  }

  // Sets the canvas font in pixels and the font-family
  ctx.font = '50px serif';

  function writeName(name) {
    const NAME_Y_COORDINATE = 750;
    const nameWidth = ctx.measureText(name).width;
    const nameCenter = fullIMG.width / 2 - nameWidth / 2;
    ctx.fillText(name, nameCenter, NAME_Y_COORDINATE);
  }

  function writeDate(date) {
    const DATE_X_COORDINATE = 975;
    const DATE_Y_COORDINATE = 1075;
    const dateArr = date.split('-');
    const finalDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    ctx.fillText(finalDate, DATE_X_COORDINATE, DATE_Y_COORDINATE);
  }

  function downloadCanvas(canvasObj, nameVar) {
    const link = document.createElement('a');
    const name = nameVar.split(' ').join('_');
    link.download = `${name}_GIS_Certificate.png`;
    // Fix to empty dataURL, ended up being a newline/whitespace issue that trips up base64 data
    // More info here: https://github.com/joltup/rn-fetch-blob/issues/190
    // https://stackoverflow.com/questions/22921242/remove-carriage-return-and-space-from-a-string/22921273
    link.href = canvasObj.toDataURL().replace(/[\n\r]+/g, '');
    console.log(canvasObj.toDataURL().replace(/[\n\r]+/g, ''));
    link.click();
  }

  // Download button
  const downloadButton = document.getElementById('download');
  downloadButton.addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();

    const nameInput = document.querySelector('input[name=nameInput]');
    const nameValue = nameInput.value;

    const dateInput = document.querySelector('input[name=dateInput]');
    const dateValue = dateInput.value;

    clearAndDraw();

    writeName(nameValue);
    writeDate(dateValue);

    downloadCanvas(canvas, nameValue);
  });
});
