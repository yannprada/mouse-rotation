
class ElementRotator {
  constructor(element) {
    this.element = element;
    this.updateInterval = 0.1;
    element.style.transition = `${this.updateInterval}s linear`;

    this.angle = 0;
    this.acceleration = 0;
    this.velocity = 0;
    this.frictionCoeff = 0.1;
    this.mass = 10;
    this.previousAcceleration = 0;

    this.TAU = 2 * Math.PI;
    setInterval(this.run.bind(this), this.updateInterval * 1000);
  }

  get rotations() {
    return this.angle / this.TAU;
  }

  get accelerationDisplay() {
    return this.previousAcceleration / this.updateInterval;
  }

  get velocityDisplay() {
    let radPerSec = this.velocity / this.updateInterval;
    return {
      radPerSec: radPerSec,
      frequency: radPerSec / this.TAU,
      rpm: radPerSec / this.TAU * 60,
    }
  }

  applyForce(f) {
    if (this.mass != 0) {
      this.acceleration += f / this.mass;
    }
  }

  _update() {
    this.velocity += this.acceleration;
    this.angle += this.velocity;
    this.previousAcceleration = this.acceleration; // to help display it
    this.acceleration = 0;
  }

  _rotate() {
    this.element.style.transform = `rotate(${this.angle}rad)`;
  }

  run() {
    this.applyForce(this.velocity * -1 * this.frictionCoeff);
    this._update();
    this._rotate();
    this.element.dispatchEvent(new CustomEvent('elementUpdated', { detail: {
      acceleration: this.accelerationDisplay,
      velocity: this.velocityDisplay,
      mass: this.mass,
      frictionCoeff: this.frictionCoeff,
      angle: this.angle,
      rotations: this.rotations,
    }}));
  }
}
