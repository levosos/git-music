import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = _ => ({
    canvas: {
        marginRight: 100,
        marginLeft: 100,
        // width: 1000,
    },
});

class ImageWaveform extends React.Component {
    componentDidMount() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        var img = new Image();
        img.src = "waveform.png";
        
        img.onload = function () {
            canvas.width = 1000;
            canvas.height = canvas.width * (img.height / img.width) * 0.35;        
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }

    handleClick = e => {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        console.log((e.clientX - rect.left) / canvas.width);

        const pos = e.clientX - rect.left;
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
    };

    render() {
        const { classes } = this.props;
        return (
            // <img src='waveform.png' style={{width: '80%'}} onClick={this.handleClick}/>
            <canvas id="canvas" className={classes.canvas} onClick={this.handleClick}>
                Your browser does not support the canvas element.
            </canvas>
        );
    }
}

ImageWaveform.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageWaveform);
