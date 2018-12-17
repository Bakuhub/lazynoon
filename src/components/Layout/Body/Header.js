import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import {withRouter} from "react-router-dom";
import {getRoutePath} from "../../../api/ApiUtils";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import {redirectUrl} from "../../../api/ApiUtils";

const styles = theme => ({

    root: {
        marginBottom: '50px',
        minHeight: '100px',
paddingTop:'200px',
        width: '100%',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: '700',
    }
    ,
});

class BodyHeader extends React.Component {


    componentDidMount() {
    }

    render() {
        const {classes, title} = this.props;
        const routePath = getRoutePath(this.props.match.url)
        return <Grid container
                     className={classes.root}
                     alignItems={'center'}
                     justify={'center'}
        >
                <Typography variant={'display1'} className={classes.title} color={'primary'}>{title}</Typography>



        </Grid>
    }
}

BodyHeader.propTypes = {

    classes: PropTypes.object.isRequired,
};

export default withWidth()(withRouter(withStyles(styles)(BodyHeader)))