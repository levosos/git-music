import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = _ => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    color: 'white',
  },
  button: {
    marginLeft: 10,
  },
});

class Merge extends React.Component {
  state = {
    alertOpen: false,
    congratsOpen: false,
    merged: false,
  };
  
  onClick = _ => {
    this.setState({
      alertOpen: true,
    });
  }
  
  onCancel = _ => {
    this.setState({
      alertOpen: false,
    });
  }
  
  onMerge = _ => {
    this.setState({
      alertOpen: false,
      congratsOpen: true,
    });
  }

  onCongratsClose = _ => {
    this.setState({
      congratsOpen: false,
      merged: true,
    });
    this.props.onMerged();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{backgroundColor: this.state.merged ? '#9b59b6' : '#27ae60'}}>
        {!this.state.merged &&
          <>
            <p>2 people approved your changes. You can merge them now</p>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick}>
              Let's do it
            </Button>
            <Dialog
                open={this.state.alertOpen}
                onClose={this.onCancel}
            >
              <DialogTitle>{"Merge changes?"}</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      After merging, these changes will be part of the ongoing project
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={this.onCancel}>
                      Still thinking about it
                  </Button>
                  <Button onClick={this.onMerge} autoFocus style={{backgroundColor: '#27ae60', color: 'white'}}>
                      merge these changes
                  </Button>
              </DialogActions>
            </Dialog>
            <Dialog
                open={this.state.congratsOpen}
                onClose={this.onCongratsClose}
            >
              <DialogTitle>
                  Congratulations!
              </DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Your changes are now merged into the project
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.onCongratsClose}>
                    Awesome
                </Button>
              </DialogActions>
            </Dialog>
          </>}
        {
          this.state.merged &&
          <>
            <p>Your changes were merged into the project</p>
          </>
        }
      </div>
    );
  }
}

Merge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Merge);
