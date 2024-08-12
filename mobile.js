class Paper {
  holdingPaper = false;
  mouseTouchX = 0; // Combined touch and mouse starting x position
  mouseTouchY = 0; // Combined touch and mouse starting y position
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Handle touch events
    paper.addEventListener("touchstart", this.touchStart.bind(this));
    paper.addEventListener("touchmove", this.touchMove.bind(this));
    paper.addEventListener("touchend", this.touchEnd.bind(this));

    // Handle mouse events
    paper.addEventListener("mousedown", this.mouseDown.bind(this));
    document.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
  }

  // Touch event handler functions
  touchStart(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    // Use touches[0] for single touch point
    this.mouseTouchX = this.prevMouseX = this.mouseX = e.touches[0].clientX;
    this.mouseTouchY = this.prevMouseY = this.mouseY = e.touches[0].clientY;
  }

  touchMove(e) {
    e.preventDefault();
    if (!this.rotating) {
      // Update touch coordinates on move
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;

      // Calculate velocity for smooth movement
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      // No rotation logic needed for touch move (handled in gesture events)
      this.updatePaperTransform();
    }
  }

  touchEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  // Mouse event handler functions
  mouseDown(e) {
    if (e.button !== 0 || this.holdingPaper) return; // Only handle left click
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    this.mouseTouchX = this.prevMouseX = this.mouseX = e.clientX;
    this.mouseTouchY = this.prevMouseY = this.mouseY = e.clientY;
  }

  mouseMove(e) {
    if (!this.holdingPaper) return;
    if (!this.rotating) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.updatePaperTransform();
    }
  }

  mouseUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  updatePaperTransform() {
    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }
}
