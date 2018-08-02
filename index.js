
document.addEventListener("DOMContentLoaded", () => {
  let elId = document.getElementById.bind(document);
  let wheel = elId('wheel');
  let rotator = new ElementRotator(wheel);

  document.querySelectorAll('input.rotatorControl').forEach((element) => {
    element.oninput = (event) => rotator[event.target.name] = event.target.value;
  });

  elId('selectWheel').onchange = (event) => {
    elId('wheel').src = `img/${event.target.value}`;
  }

  const updateValue = (id, val) => elId(id).textContent = val;
  const round = (val) => Math.round(val * 100) / 100;
  const updateAndRound = (id, val) => updateValue(id, round(val));

  trackMouseRotation(wheel, (event) => {
    cwControl = document.querySelector('input.mouseControl[value=CW]');
    ccwControl = document.querySelector('input.mouseControl[value=CCW]');
    if (cwControl.checked && event.detail.clockwise ||
        ccwControl.checked && !event.detail.clockwise) {
      rotator.applyForce(event.detail.angleDelta);
      updateAndRound('mouseX', event.detail.position.x);
      updateAndRound('mouseY', event.detail.position.y);
      updateAndRound('mouseAngle', event.detail.angle);
      updateAndRound('mouseAngleDelta', event.detail.angleDelta);
      updateValue(
        'mouseDirection',
        event.detail.clockwise ? 'CW' : 'CCW'
      );
    }
  });

  wheel.addEventListener('elementUpdated', (event) => {
    updateAndRound('acceleration', event.detail.acceleration);
    updateAndRound('velocity', event.detail.velocity.radPerSec);
    updateAndRound('rpm', event.detail.velocity.rpm);
    updateAndRound('frequency', event.detail.velocity.frequency);
    updateAndRound('period', 1 / round(event.detail.velocity.frequency));
    updateValue('mass', event.detail.mass);
    updateValue('frictionCoeff', event.detail.frictionCoeff);
    updateAndRound('angle', event.detail.angle);
    updateAndRound('rotations', event.detail.rotations);
  });
});
