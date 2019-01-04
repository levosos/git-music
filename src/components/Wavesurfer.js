import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { default as Ws } from 'react-wavesurfer';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Forward5Icon from '@material-ui/icons/Forward5';
import Replay5Icon from '@material-ui/icons/Replay5';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = _ => ({
  bigIcon: {
    height: 45,
    width: 45,
  },
  smallIcon: {
    height: 28,
    width: 28,
  },
  progress: {
    textAlign: 'center',
  },
});

class Wavesurfer extends React.Component {
  state = {
    playing: false,
    pos: 0,
    duration: 0,
    loaded: false,
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

  handlePrevious = _ => {
    var newPos = this.state.pos - 5;
    if (newPos < 0) { newPos = 0 }
    this.setState({
      pos: newPos
    });
  }
  
  handleNext = _ => {
    var newPos = this.state.pos + 5;
    if (newPos > this.state.duration) { newPos = this.state.duration }
    this.setState({
      pos: newPos
    });
  }

  onReady = e => {
    this.setState({
      duration: e.wavesurfer.getDuration(),
      loaded: true,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={16}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid
          item
          xs={12}
        >
          {!this.state.loaded && <div className={classes.progress}>
            <CircularProgress />
          </div>}
          <Ws
            audioFile={'audio/ohdarling.mpeg'}
            pos={this.state.pos}
            onPosChange={this.handlePosChange}
            playing={this.state.playing}
            options= {{
              waveColor: '#f19066',
              progressColor: '#00b894',
              cursorColor: '#0984e3',
              responsive: true,
            }}
            onReady={this.onReady}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Tooltip title="Replay 5 seconds">
              <IconButton onClick={this.handlePrevious} disabled={!this.state.loaded}>
                <Replay5Icon className={classes.smallIcon}/>
              </IconButton>
            </Tooltip>
            <Tooltip title={this.state.playing ? "Pause" : "Play"}>
              <IconButton onClick={this.handleTogglePlay} disabled={!this.state.loaded}>
                {!this.state.playing && <PlayArrowIcon className={classes.bigIcon}/>}
                {this.state.playing && <PauseIcon className={classes.bigIcon}/>}
              </IconButton>
            </Tooltip>
            <Tooltip title="Skip 5 seconds">
              <IconButton onClick={this.handleNext} disabled={!this.state.loaded}>
                <Forward5Icon className={classes.smallIcon}/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      );
  }
}

Wavesurfer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wavesurfer);
