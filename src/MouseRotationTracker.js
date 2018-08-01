
class MouseRotationTracker {
  constructor(element) {
    this.element = element;
    this.center = {
      x: element.width/2,
      y: element.height/2,
    }
    this.angles = [];
    this.TAU = 2 * Math.PI;
    this.element.onmousemove = this.handleMouseMove.bind(this);
    this.element.onmouseout = this.handleMouseOut.bind(this);
  }
  
  handleMouseMove(event) {
    let angle = this.getAngle(event);
    this.angles.push(angle);
    
    this.element.dispatchEvent(new CustomEvent('mouseRotation', { detail: {
      position: this.getPosition(event),
      angle: angle,
      angleDelta: this.getAnglesDelta(),
    }}));
  }
  
  handleMouseOut(event) {
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
    if (delta > Math.PI) { return this.TAU - delta }
    return delta;
  }
}

function trackMouseRotation(element, callback) {
  setTimeout(() => {
    new MouseRotationTracker(element);
    element.addEventListener('mouseRotation', callback);
  }, 10);
}
