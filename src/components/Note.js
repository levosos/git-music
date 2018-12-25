import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import Users from '../Users';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = _ => ({
  header: {
    backgroundColor: '#7BDCB5',
    height: 33,
  },
  headerDeleted: {
    backgroundColor: grey[200],
    height: 33,
  },
  headerLoggedIn: {
    backgroundColor: '#74b9ff',
    height: 33,
  },
  card: {
    marginBottom: 16,
    // marginLeft: 150,
    // marginRight: 150,
  },
  actions: {
    height: 50,
    display: 'flex',
    backgroundColor: grey[200],
  },
  avatar: {
    width: 50,
    height: 50,
    padding: 3,
    backgroundColor: grey[100],
  },
  likeClicked: {
    color: green[500],
  },
  dislikeClicked: {
    color: red[500],
  },
});

class Note extends React.Component {
    state = {
        anchorEl:           null,

        thumbUpCount:       this.props.thumbUpCount | 0,
        thumbUpClicked:     this.props.thumbUpClicked | false,
        thumbDownCount:     this.props.thumbDownCount | 0,
        thumbDownClicked:   this.props.thumbDownClicked | false,

        deleteNoteAlertOpen: false,
        deleted: false,
    };
    
    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };
    
    handleThumbUpClicked = _ => {
        var count = this.state.thumbUpCount;
        if (this.state.thumbUpClicked) {
            count--;
        } else {
            count++;
        }

        this.setState({
            thumbUpClicked: !this.state.thumbUpClicked,
            thumbUpCount: count,
        });
    };

    handleThumbDownClicked = _ => {
        var count = this.state.thumbDownCount;
        if (this.state.thumbDownClicked) {
            count--;
        } else {
            count++;
        }

        this.setState({
            thumbDownClicked: !this.state.thumbDownClicked,
            thumbDownCount: count,
        });
    };

    handleDeleteNoteAlertOpen = _ => {
        this.handleMenuClose();
        this.setState({
            deleteNoteAlertOpen: true,
        });
    };

    handleDeleteNoteAlertCancel = _ => {
        this.setState({
            deleteNoteAlertOpen: false,
        });
    };

    handleDeleteNoteAlertDelete = _ => {
        this.setState({
            deleteNoteAlertOpen: false,
            deleted: true,
        });
    };

    handleRestore = _ => {
        this.handleMenuClose();
        this.setState({
            deleted: false,
        });
    };

  render() {
    const { classes } = this.props;
    const user = Users[this.props.user];

    return (
      <Card className={classes.card}>
        <CardHeader className={this.state.deleted ? classes.headerDeleted : (user.loggedIn ? classes.headerLoggedIn : classes.header)}
          avatar={<Avatar src={"/avatars/" + user.avatar + ".png"} className={classes.avatar} />}
          action={user.loggedIn &&
            <React.Fragment>
                <IconButton onClick={this.handleMenuClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleMenuClose}
                >
                    {!this.state.deleted && (
                        <>
                            <MenuItem onClick={this.handleMenuClose}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                Edit
                            </MenuItem>
                            <MenuItem onClick={this.handleDeleteNoteAlertOpen}>
                                <ListItemIcon>
                                    <DeleteIcon />
                                </ListItemIcon>
                                Delete
                            </MenuItem>
                        </>)}
                    {this.state.deleted && (
                        <MenuItem onClick={this.handleRestore}>
                            <ListItemIcon>
                                <RestoreIcon />
                            </ListItemIcon>
                            Restore
                        </MenuItem>
                    )}
                </Menu>
                <Dialog
                    open={this.state.deleteNoteAlertOpen}
                    onClose={this.handleDeleteNoteAlertCancel}
                >
                    <DialogTitle>{"Delete this note?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            After deleting a note, other users will see the note was deleted and will
                            not be able to see its contents.
                            You will be able to re-add it any time afterwards
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteNoteAlertCancel} autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteNoteAlertDelete} style={{backgroundColor: '#ff7675'}}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
          }
          title={<b>{user.name}</b>}
          subheader={this.props.date}
        />
        <CardContent className={classes.content}>
          <Typography component="p">
            {!this.state.deleted && this.props.children}
            {this.state.deleted && "This message was deleted by its author"}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
            <Tooltip title="Like">
                <IconButton disabled={this.state.deleted || user.loggedIn || this.state.thumbDownClicked} onClick={this.handleThumbUpClicked}>
                    <Badge invisible={!this.state.thumbUpCount} badgeContent={this.state.thumbUpCount}>
                        <ThumbUpIcon className={this.state.thumbUpClicked ? classes.likeClicked : undefined} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Disike">
                <IconButton disabled={this.state.deleted || user.loggedIn || this.state.thumbUpClicked} onClick={this.handleThumbDownClicked}>
                    <Badge invisible={!this.state.thumbDownCount} badgeContent={this.state.thumbDownCount}>
                        <ThumbDownIcon className={this.state.thumbDownClicked ? classes.dislikeClicked : undefined} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Share">
                <IconButton disabled={this.state.deleted}>
                    <ShareIcon />
                </IconButton>
            </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

Note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Note);
