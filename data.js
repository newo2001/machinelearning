let imageData, labelData;
let index = 0;

function readImageData() {
  labelData = readFile("train-labels.idx1-ubyte", function(v) {labelData = v;});
  imageData = readFile("train-images.idx3-ubyte", function(v) {
    imageData = v;
    document.getElementById("train").disabled = false;
  });
}

function readFile(path, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", path, true);
  req.responseType = "arraybuffer";

  req.onload = function() {
    callback(new Uint8Array(req.response));
  }

  req.send(null);
}

function nextBatch(batchSize) {
  const LABEL_SIZE = 10;
  let batchImages = new Float32Array(batchSize * Image.size * Image.size);
  let batchLabels = new Uint8Array(batchSize * LABEL_SIZE);

  for (let i = 0; i < batchSize; i++) {
    let img = new Image(index);
    batchImages.set(img.pixels, i * Image.size * Image.size);

    let labels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    labels[img.label] = 1;
    batchLabels.set(labels, i * LABEL_SIZE);
    index++;
  }

  return {
    xs: tf.tensor2d(batchImages, [batchSize, Image.size * Image.size]),
    labels: tf.tensor2d(batchLabels, [batchSize, LABEL_SIZE])
  };
}

class Image {
  constructor(n) {
    const imageOffset = 16;
    const labelOffset = 8;

    this.label = labelData[labelOffset + n];

    let start = imageOffset + n * Image.size * Image.size;
    this.pixels = new Float32Array(imageData.subarray(start, start + Image.size * Image.size));
    for (let b in this.pixels) {
      this.pixels[b] = (this.pixels[b] & 0xFF) / 255;
    }
  }
}
Image.size = 28;
