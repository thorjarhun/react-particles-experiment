import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { select as d3Select, mouse as d3Mouse, touches as d3Touches } from 'd3';

import Particles from './Particles';
import Footer from './Footer';
import Header from './Header';
import { createParticles } from '../actions';

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = dispatch => ({
  createParticles: (x, y) => dispatch(createParticles(x, y))
});

const ReduxContainer = connect(mapStateToProps, mapDispatchToProps);

class App extends Component {
    componentDidMount() {
        let svg = d3Select(this.refs.svg);
        svg.on('mousedown', () => {
            let [x, y] = d3Mouse(this.refs.svg);
            this.props.createParticles(x, y);
        });
        svg.on('touchstart', () => {
            let [x, y] = d3Touches(this.refs.svg)[0];
            this.props.createParticles(x, y);
        });
    }
    render() {
        return (
            <div style={{overflow: 'hidden'}}>
                 <Header />
                 <svg style={{width: this.props.svgWidth,
                              height: this.props.svgHeight,
                              position: 'absolute',
                              top: '0px',
                              left: '0px',
                              background: 'rgba(124, 224, 249, .3)'}}
                      ref="svg">
                      <Particles particles={this.props.particles} />
                 </svg>
                 <Footer N={this.props.particles.length} />
             </div>
        );
    }
}

App.propTypes = {
    svgWidth: PropTypes.number.isRequired,
    svgHeight: PropTypes.number.isRequired
};

export default ReduxContainer(App);
