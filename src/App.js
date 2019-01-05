import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Conversation from './components/Conversation';
import Merge from './components/Merge';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import Description from './components/Description';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Breadcrumb from './components/Breadcrumb';
import Wavesurfer from './components/Wavesurfer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const styles = _ => ({
  specs: {
    marginTop: 60,
  },
  specsCard: {
    backgroundColor: '#34495e',
  },
  specsContent: {
    color: 'white',
  },
  hidden: {
    display: 'none',
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    width: 240,
    height: 60,
  },
  merged: {
    backgroundColor: '#9b59b6',
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

class App extends Component {
  state = {
    value: 0,
    merged: false,
  };
  
  handleTabSelected = (_, value) => {
    this.setState({ value });
  };
  
  onMerged = _ => {
    this.setState({ merged: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <PrimarySearchAppBar />
        <div style={{marginLeft: 15, marginTop: 15}}>
        <Typography variant='h6' color="primary">
          <Breadcrumb image="TheBeatles.jpg">
            <b>The Beatles</b>
          </Breadcrumb>
          <span> / </span>
          <Breadcrumb image="Abbey_Road.jpg">
            <b>Abbey Road</b>
          </Breadcrumb>
          <span> / </span>
          <Breadcrumb>
            <b>Oh! Darling</b>
          </Breadcrumb>
        </Typography>
        </div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{marginLeft: 15 }}
        >
          <Grid item xs={6}>
            <Typography variant='h4'>
              {this.state.merged && <span className={classes.merged}>Merged:</span>}Changed the effects in the main solo
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title={
                <Grid 
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <b style={{color: '#27ae60'}}>Green</b>
                  </Grid>
                  <Grid item xs={6}>
                    no changes
                  </Grid>
                  <Grid item xs={6}>
                    <b style={{color: '#e67e22'}}>Orange</b>
                  </Grid>
                  <Grid item xs={6}>
                    light changes
                  </Grid>
                  <Grid item xs={6}>
                    <b style={{color: '#e74c3c'}}>Red</b>
                  </Grid>
                  <Grid item xs={6}>
                    significant changes
                  </Grid>
                </Grid>
              }
              classes={{ tooltip: classes.tooltip }}
            >
              <img src="/images/waveform_heatmap2.png" width='90%' />
            </Tooltip>
          </Grid>
        </Grid>
        <Divider />
        <Description user='martin' date='April 1, 1969 10:10' />
        <Divider />
        <Grid
          container
          spacing={16}
          className={classes.grid}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={7}>
            <Toolbar position="static">
              <Tabs
                value={this.state.value}
                onChange={this.handleTabSelected}
                indicatorColor="primary"
              >
                <Tab label="Conversation" />
                <Tab label="Change" />
              </Tabs>
            </Toolbar>
            <div className={this.state.value === 0 ? null : classes.hidden}><Conversation/></div>
            {this.state.value === 1 && <Wavesurfer/>}
          </Grid>
          <Grid item xs={3} className={classes.specs}>
            <Card className={classes.specsCard}>
              <CardHeader
                style={{ backgroundColor: '#40739e', height: 12 }}
                title={<Typography variant='subtitle1' style={{color: 'white'}}><b>Specs</b></Typography>}
              />
              <CardContent>
                <Typography className={classes.specsContent}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                  {[
                    {k: 'Sample Rate', v: '44.1 kHz'},
                    {k: 'Format', v: 'MPEG Audio'},
                    {k: 'Format Version', v: 'Version 1'},
                    {k: 'Format Profile', v: 'Layer 3'},
                    {k: 'Channels', v: 'Stereo'},
                    {k: 'Duration', v: '3m 27s'},
                  ].map((d) => {
                    return (
                      <>
                        <Grid item xs={7}>
                          {d.k}:
                        </Grid>
                        <Grid item xs={5}>
                          <b>{d.v}</b>
                        </Grid>
                      </>
                    )})}
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
            </Grid>
          </Grid>
          <Divider style={{marginTop: 10 }}/>
          <Merge onMerged={this.onMerged}/>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
