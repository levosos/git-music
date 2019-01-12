import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tag from './Tag';

const styles = _ => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    color: 'white',
  },
  button: {
    margin: 5,
  },
});

class Review extends React.Component {
  state = {
    approve: false,
    disagree: false,
    alertOpen: false,
  };
  
  onApprove = _ => {
    this.setState({
      approve: true,
    });
  }
  
  onDisagree = _ => {
    this.setState({
      alertOpen: true,
    });
  }
  
  onUndo = _ => {
    this.setState({
      approve: false,
      disagree: false,
    });
  }
  
  onCloseAlert = _ => {
    this.setState({
      alertOpen: false,
      disagree: true,
    });
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
        style={{backgroundColor: this.state.approve ? '#27ae60' : (this.state.disagree ? '#e74c3c' : '#34495e')}}
      >
        {!this.state.approve && !this.state.disagree && 
        <>
          <p>Hey there! <span style={{color: '#34495e'}}><Tag user='martin'>George Martin</Tag></span> is still waiting for your review</p>
          <div>
            <Button variant="contained" className={classes.button} style={{backgroundColor: "#27ae60"}} onClick={this.onApprove}>
                Approve
            </Button>
            <Button variant="contained" className={classes.button} style={{backgroundColor: "#e74c3c"}} onClick={this.onDisagree}>
                Disagree
            </Button>
          </div>
        </>}
        {this.state.approve &&
        <div>
          You approved this change
          <Button variant="outlined" style={{marginLeft: 15}} onClick={this.onUndo}>
              Undo
          </Button>
        </div>}
        {this.state.disagree &&
        <div>
          You disagreed with this change
          <Button variant="outlined" style={{marginLeft: 15}} onClick={this.onUndo}>
              Undo
          </Button>
        </div>}
        <Dialog
          open={this.state.alertOpen}
          onClose={this.onCloseAlert}
        >
          <DialogTitle>{"Thanks for your feedback"}</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Please help <Tag user='martin'>George Martin</Tag> understand what you disagree with and explain yourself in a comment
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.onCloseAlert}>
                  Ok
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);
