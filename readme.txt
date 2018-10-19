Usage:

The following files should be in the same directory.
- index.html
- data.js
- train-images-idx3-ubyte
- train-labels.idx1-ubyte

These files should be stored on a webserver and CAN NOT be ran from the filesystem
This is due to browsers not allowing javascript to read using the File protocol to
prevent browsers from accessing private data.

Make sure to be connected to the internet when using this because
certain libraries are requested via their CDN, this will not work without an internet connection.

To start, open index.html.

Once opened you are greeted by a 28x28 square grid, 3 buttons and an input box.
You start by clicking the "train" button to train the network.
Wait for the network to finish training.
The 28x28 grid can be interacted with using the left mouse button to draw something.
The input field will set the size (radius) of the square brush used on the canvas (default 1).
Valid brush sizes are 0-14 inclusive, with 0 being a single pixel.
Shift + left mouse can be used to erase.
The clear button will clear the canvas.
The guess button will make the neural network guess what number is drawn on the 28x28 canvas at that time.
Please note that the network does have to be trained for this.
