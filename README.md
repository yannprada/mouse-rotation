# mouse-rotation

Rotate a DOM element when the mouse moves around its center

## Demo

[Mouse Rotation!](https://yannprada.github.io/mouse-rotation/docs)

## Modules

### src/ElementRotator.js

usage:
```
// you want to rotate your #wheel
const element = document.getElementById('wheel');
const rotator = new ElementRotator(element);
...
// apply an angular force (in radians)
rotator.applyForce(f);
...
// get more infos when the element is updated
element.addEventListener('elementUpdated', (event) => {
  console.log('acceleration', event.detail.acceleration);
  console.log('velocity', event.detail.velocity.radPerSec);
  console.log('rpm', event.detail.velocity.rpm);
  console.log('frequency', event.detail.velocity.frequency);
  console.log('mass', event.detail.mass);
  console.log('frictionCoeff', event.detail.frictionCoeff);
  console.log('angle', event.detail.angle);
  console.log('rotations', event.detail.rotations);
});
```

### src/MouseRotationTracker.js

usage:
```
// track your mouse, relative to #wheel
const element = document.getElementById('wheel');
trackMouseRotation(element, (event) => {
    console.log('mouseX', event.detail.position.x);
    console.log('mouseY', event.detail.position.y);
    console.log('mouseAngle', event.detail.angle);
    console.log('mouseAngleDelta', event.detail.angleDelta);
    console.log(
      'mouseDirection',
      event.detail.clockwise ? 'CW' : 'CCW'
    );
  }
});
```
