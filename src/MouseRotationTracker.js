
class MouseRotationTracker {
  constructor(element) {
    this.element = element;
    this.center = {
      x: element.width/2,
      y: element.height/2,
    }
    this.angles = [];
    this.TAU = 2 * Math.PI;

    let handleTouch = this.handleTouch.bind(this);
    let handleMove = this.handleMove.bind(this);
    let handleOut = this.handleOut.bind(this);
    this.element.onmousemove = handleMove;
    this.element.onmouseout = handleOut;
    this.element.addEventListener('touchstart', handleTouch, false);
    this.element.addEventListener('touchmove', handleTouch, false);
    this.element.addEventListener('touchend', handleOut, false);
    this.element.addEventListener('touchcancel', handleOut, false);
  }

  handleTouch(event) {
    if (event.touches.length) {
      event.preventDefault();
      event.stopPropagation();
      let touch = event.touches[0];
      event.x = touch.pageX - event.target.offsetLeft;
      event.y = touch.pageY - event.target.offsetTop;
      this.handleMove(event);
    }
  }

  handleMove(event) {
    let angle = this.getAngle(event);
    let position = this.getPosition(event);
    this.angles.push(angle);
    let angleDelta = this.getAnglesDelta();
    let clockwise = angleDelta > 0;

    if (angleDelta != 0) {
      this.element.dispatchEvent(new CustomEvent('mouseRotation', {
        detail: { position, angle, angleDelta, clockwise }
      }));
    }
  }

  handleOut(event) {
    this.angles = [];
  }

  getPosition(event) {
    return { x: event.x - this.center.x,
             y: event.y - this.center.y }
  }

  getAngle(event) {
    let position = this.getPosition(event);
    let angle = Math.atan2(position.y, position.x);
    if (position.y < 0) {
      angle += this.TAU;
    }
    return angle;
  }

  getAnglesDelta() {
    let l = this.angles.length;
    if (l < 2) { return 0 }
    let delta = this.angles[l - 1] - this.angles[l - 2];
    if (isNaN(delta)) { return 0 }
    if (delta < -Math.PI) { return this.TAU + delta }
    if (delta > Math.PI) { return (this.TAU - delta) * -1 }
    return delta;
  }
}

function trackMouseRotation(element, callback) {
  setTimeout(() => {
    new MouseRotationTracker(element);
    element.addEventListener('mouseRotation', callback);
  }, 10);
}
