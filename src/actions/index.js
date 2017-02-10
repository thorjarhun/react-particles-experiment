export const TICK = 'TICK';
export const CREATE_PARTICLES = 'CREATE_PARTICLES';
export const RESIZE_SCREEN = 'RESIZE_SCREEN';

export const tick = () =>  ({
  type: TICK
});

export const createParticles = (x, y) => ({
  type: CREATE_PARTICLES,
  x,
  y
});

export const resizeScreen = (width, height) => ({
  type: RESIZE_SCREEN,
  width,
  height
});
