import { randomNormal, randomUniform } from 'd3';
import {
  TICK,
  CREATE_PARTICLES,
  RESIZE_SCREEN
} from '../actions';

const Gravity = 0.3,
  randNormal = randomNormal(0.3, 2),
  randNormal2 = randomNormal(0.5, 1.8);

const initialState = {
  particles: [],
  particleIndex: 0,
  svgWidth: 800,
  svgHeight: 600,
  lastFrameTime: new Date()
};

const particlesPerTick = 100;

const particlesApp = (state = initialState, action) => {
  switch (action.type) {
    case TICK:
      const {svgWidth, svgHeight, lastFrameTime} = state,
          newFrameTime = new Date(),
          multiplier = (newFrameTime-lastFrameTime)/(1000/60);

      const movedParticles = state.particles
                                .filter(p => !(p.y > svgHeight || p.x < 0 || p.x > svgWidth))
                                .map(p => {
                                    let [vx, vy] = p.vector;

                                    p.x += vx*multiplier;
                                    p.y += vy*multiplier;

                                    p.vector[1] += Gravity*multiplier;
                                    return p;
                                });

      return Object.assign({}, state, {
          particles: movedParticles,
          lastFrameTime: new Date()
      });
    case CREATE_PARTICLES:
        const newParticles = [...Array(particlesPerTick).keys()].map(i => ({
          id: state.particleIndex+i,
          x: action.x,
          y: action.y,
          vector: [i%2 ? -randNormal() : randNormal(), -randNormal2()*3]
        }));

        return Object.assign({}, state, {
            particles: newParticles.concat(state.particles),
            particleIndex: state.particleIndex+particlesPerTick+1
        });
    case RESIZE_SCREEN:
        return {
          ...state,
          svgWidth: action.width,
          svgHeight: action.height
        };
    default:
        return state;
  }
};

export default particlesApp;
