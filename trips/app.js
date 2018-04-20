/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';

import {json as requestJson} from 'd3-request';
// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2l0Y2F0a2FpIiwiYSI6ImNqNzhudDQ5eDA5bjQyd21saTc5YjdoeXAifQ.4_rLXSsorv1C6veaChrGRg'; // eslint-disable-line

// Source data CSV
const DATA_URL = {
  BUILDINGS: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json',  // eslint-disable-line
  TRIPS: './data.json'  // eslint-disable-line
};

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      buildings: null,
      trips: null,
      time: 0
    };

    // requestJson(DATA_URL.BUILDINGS, (error, response) => {
    //   if (!error) {
    //     this.setState({buildings: response});
    //   }
    // });

    requestJson(DATA_URL.TRIPS, (error, response) => {
      if (!error) {
        this.setState({trips: response});
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
    this._animate();
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }



  _animate() {
    // const timestamp = Date.now();
    // const loopLength = 950973;
    // const loopTime = 100000;
    // ((timestamp % loopTime) / loopTime) * loopLength
    if (this.state.time > 9999){
      this.setState({
      time: 9999
    });
    } else {
            this.setState({
      time: this.state.time + 4
    });
    }
    console.log('Current Time: ', this.state.time);
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));



  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  render() {
    const {viewport, buildings, trips, time} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay viewport={viewport}
          buildings={buildings}
          trips={trips}
          trailLength={1000}
          time={time}
          />
      </MapGL>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
