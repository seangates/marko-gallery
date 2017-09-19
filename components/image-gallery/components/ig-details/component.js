let images = require('../../../../data/images');
let imagesLength = images.length;

module.exports = class {
  onCreate() {
    this.state = {
      noTools: false,
      currentImageId: 0,
      prevImageId: 0,
      nextImageId: 0
    }
  }

  onMount() {
    let Hammer = require('hammerjs');
    this.hammertime = new Hammer(this.el);

    this.hammertime.on('swipeleft swiperight', (evt) => {
      if (evt.type === 'swipeleft') {
        // next image
        this.emit('changeImage', images[this.state.nextImageId]);
      }
      else if (evt.type === 'swiperight') {
        // prev image
        this.emit('changeImage', images[this.state.prevImageId]);
      }
    });
  }

  onInput(input) {
    let currentImageId;
    let prevImageId;
    let nextImageId;

    if (input.imageData && input.imageData.id) {
      currentImageId = parseInt(input.imageData.id);
      prevImageId = this.getPrevImage(currentImageId);
      nextImageId = this.getNextImage(currentImageId);

      this.state.currentImageId = currentImageId;
      this.state.prevImageId = prevImageId;
      this.state.nextImageId = nextImageId;
    }
  }

  getNextImage(imageId) {
    let nextImageId;
    if (imageId === imagesLength) {
      nextImageId = 1;
    }
    else {
      nextImageId = imageId;
    }
    return nextImageId;
  }

  getPrevImage(imageId) {
    let prevImageId;
    if ((imageId - 1) === 0) {
      prevImageId = imagesLength - 1;
    }
    else {
      prevImageId = imageId - 2;
    }
    return prevImageId;
  }

  closeDetails() {
    this.emit('closeDetails');
  }

  footerAction(action) {
    alert(`The '${action}' button isn't set up yet.`);
  }

  toggleTools() {
    this.state.noTools = !this.state.noTools;
  }
}
