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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import Users from '../Users';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Tooltip from '@material-ui/core/Tooltip';

const styles = _ => ({
  header: {
    backgroundColor: '#7BDCB5',
    height: 33,
  },
  card: {
    margin: 15,
    marginLeft: 50,
    marginRight: 50,
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
        thumbUpCount:       this.props.thumbUpCount | 0,
        thumbUpClicked:     this.props.thumbUpClicked | false,
        thumbDownCount:     this.props.thumbDownCount | 0,
        thumbDownClicked:   this.props.thumbDownClicked | false,
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
            {this.props.children}
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

Note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Note);
