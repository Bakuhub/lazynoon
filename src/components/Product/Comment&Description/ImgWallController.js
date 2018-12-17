import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

const styles = theme => ({
    root: {
    }, img: {
        height: '80px',
        width: '80px',
        padding:'5px' ,
    }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function SingleLineGridList(props) {
    const {classes, tileData} = props;

    return (
        <Grid container justify={'flex-start'} alignItems={'center'} className={classes.root}>
            {tileData.map(tile => (
                <Grid item>
                    <img src={tile.img} className={classes.img} alt={tile.title}/>
                </Grid>
            ))}
        </Grid>
    );
}

SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);