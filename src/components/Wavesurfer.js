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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes+':'+seconds;
  // return hours+':'+minutes+':'+seconds;
}

const styles = theme => ({
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
  toggleContainer: {
    // height: 56,
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // margin: `${theme.spacing.unit}px 0`,
    marginTop: 10,
  },
});

class Wavesurfer extends React.Component {
  state = {
    playing: false,
    pos: 0,
    duration: 0,
    loaded: false,
    audio: 'audio/full.mp3',
    view: 'stacked',
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
    if (newPos >= this.state.duration) { newPos = this.state.duration - 1 }
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
  
  changeAudio = (event, _) => {
    this.setState({
      audio: event.target.value,
      playing: false,
      pos: 0,
    });
  }

  onViewChanged = (_, value) => {
    this.setState({
      view: value,
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
        <Grid item>
          {!this.state.loaded && <div className={classes.progress}>
            <CircularProgress />
          </div>}
          {this.state.loaded && 
            <>
              <span>I want to listen to the </span>
              <Select
                  value={this.state.audio}
                  onChange={this.changeAudio}
                >
                  <MenuItem value='audio/part.mp3'>changed part</MenuItem>
                  <MenuItem value='audio/full.mp3'>entire song</MenuItem>
              </Select>
            </>}
          <Ws
            audioFile={this.state.audio}
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
        <Grid item>
          <Grid
            container
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs>
              {this.state.pos.toString().toHHMMSS()} / {this.state.duration.toString().toHHMMSS()}
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs/>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={16}
            direction={this.state.view == "side-by-side" ? "row" : "column"}
            justify="center"
            alignItems="center"
            >
            <Grid item xs={this.state.view == 'side-by-side' ? 6 : 8}>
              <Tooltip title="Before the change">
                <img src="images/redWave.png" style={{width: '100%'}} />
              </Tooltip>
            </Grid>
            <Grid item xs={this.state.view == 'side-by-side' ? 6 : 8}>
              <Tooltip title="After the change">
                <img src="images/greenWave.png" style={{width: '100%'}} />
              </Tooltip>
            </Grid>
          </Grid>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup exclusive value={this.state.view} onChange={this.onViewChanged}>
              <ToggleButton value="side-by-side">
                Side-by-side
              </ToggleButton>
              <ToggleButton value="stacked">
                Stacked
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>
      </Grid>
      );
  }
}

Wavesurfer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wavesurfer);
