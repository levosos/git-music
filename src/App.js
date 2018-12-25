import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Conversation from './components/Conversation';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import Description from './components/Description';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Breadcrumb from './components/Breadcrumb';
import Wavesurfer from './components/Wavesurfer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const styles = _ => ({
  grid: {
    padding: 30,
  },
});

class App extends Component {
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
        <div style={{marginLeft: 15, marginTop: 15}}>
        <Typography variant='h4'>
          Changed the effects in the main solo
        </Typography>
        </div>
        <Description user='martin' date='November 27, 1967 10:10' />
        <Wavesurfer />
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
            <Conversation/>
            </Grid>
            <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography>
                  <b>Specs</b>
                  <br/>
                  TBD
                </Typography>
              </CardContent>
            </Card>
            </Grid>
          </Grid>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
