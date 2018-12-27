import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { default as Ws } from 'react-wavesurfer';
import Button from '@material-ui/core/Button';

const styles = _ => ({
});

class Wavesurfer extends React.Component {
  state = {
    playing: false,
    pos: 0,
  };

  handleTogglePlay = _ => {
    this.setState({
      playing: !this.state.playing
    });
  }

  handlePosChange = e => {
    this.setState({
      pos: e.originalArgs[0]
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Ws
          audioFile={'audio/test.mp3'}
          pos={this.state.pos}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
          options= {{
            waveColor: '#e17055',
            progressColor: '#00b894',
            cursorColor: '#0984e3',
            responsive: true,
          }}
        />
        <Button onClick={this.handleTogglePlay}>
          Play / Pause
        </Button>
      </div>
      );
  }
}

Wavesurfer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wavesurfer);
