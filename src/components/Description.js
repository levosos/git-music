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
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import Users from '../Users';
import Chip from '@material-ui/core/Chip';
import Hashtags from './Hashtags';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  header: {
    backgroundColor: '#fdcb6e',
  },
  card: {
    margin: 15,
    overflow: 'visible',
  },
  actions: {
    height: 50,
    display: 'flex',
    backgroundColor: '#ffeaa7',
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

class Description extends React.Component {
  state = {
    thumbUpCount:       1,
    thumbUpClicked:     false,
    thumbDownCount:     0,
    thumbDownClicked:   false,
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

  render() {
    const { classes } = this.props;
    const user = Users[this.props.user];

    return (
      <Card className={classes.card}>
        <CardHeader className={classes.header}
          avatar={<Avatar src={"/avatars/" + user.avatar + ".png"} className={classes.avatar} />}
          title={<b>{user.name}</b>}
          subheader={this.props.date}
        />
        <CardContent className={classes.content}>
          <Typography component="p">
            <Typography>
              Hi guys, I tried different effects for the main solo and came up with this idea.
              <br/>
              Check it out and let me know what you think!
              <br/>
              <br/>
          </Typography>
          {/* {["Replacement", "Solo", "Guitar", "Effects"].map((label) => {
            return <Chip label={label} color="primary" className={classes.chip}/>
          })} */}
          <Hashtags />
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Tooltip title="Like">
                <IconButton disabled={this.state.thumbDownClicked} onClick={this.handleThumbUpClicked}>
                    <Badge invisible={!this.state.thumbUpCount} badgeContent={this.state.thumbUpCount}>
                        <ThumbUpIcon className={this.state.thumbUpClicked ? classes.likeClicked : undefined} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Disike">
                <IconButton disabled={this.state.thumbUpClicked} onClick={this.handleThumbDownClicked}>
                    <Badge invisible={!this.state.thumbDownCount} badgeContent={this.state.thumbDownCount}>
                        <ThumbDownIcon className={this.state.thumbDownClicked ? classes.dislikeClicked : undefined} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Share">
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);
