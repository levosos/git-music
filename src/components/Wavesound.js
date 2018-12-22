import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Waveform from 'waveform-react';
import Button from '@material-ui/core/Button';

const styles = _ => ({
    popover: {
      pointerEvents: 'none',
    },
    tag: {
      backgroundColor: '#7BDCB5',
    },
    paper: {
      display: 'flex',
      padding: 10,
    },
  });
  
class Wavesound extends React.Component {
    state = {
        buffer: null,
        // context: null,
        markerStyle: {
        //   color: color.tertiary,
          width: 4
        },
        pos: 0,
        responsive: true,
        showPosition: true,
        waveStyle: {
          animate: true,
        //   color: color.primary,
          plot: 'bar',
          pointWidth: 1
        },
        width: 900
      };

    getContext = () => {
        window.AudioContext =
            window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext;
        const context = new AudioContext();
        return context;
    };

    componentWillMount() {
        const context = this.getContext();
        this.getAudioBuffer('audio/test.mp3', context).then(buffer => { this.setState({ buffer }); });
    }
    
    getAudioBuffer = async (path, context) => {
        const response = await fetch(path);
        const audioData = await response.arrayBuffer();
        return new Promise((resolve, reject) => {
          context.decodeAudioData(audioData, buffer => {
            return resolve(buffer);
          });
        });
      };

    handlePlay = _ => {
        if (this.state.pos === 0.1) { return; }

        this.setState({pos: this.state.pos+0.001});
        setTimeout(this.handlePlay, 50);
    };
    
    render() {
        return (
            <>
                <Waveform
                    buffer={this.state.buffer}
                    height={150}
                    markerStyle={{
                        color: '#fab1a0',
                        width: 2
                    }}
                    onPositionChange={pos => this.setState({pos})}
                    plot="bar"
                    position={this.state.pos}
                    responsive={true}
                    showPosition={true}
                    waveStyle={{
                        animate: true,
                        color: '#00b894',
                        pointWidth: 1
                    }}
                    width={2000}
                />
                <Button onClick={this.handlePlay}>
                    Play
                </Button>
            </>
        );
    }
}

Wavesound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wavesound);
  