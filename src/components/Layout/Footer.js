import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: '50px 100px 100px 100px',
        marginTop: '30px',
    },
    emailBar: {
        marginBottom: '30px',
    }
});

const footerOptions = [
    'About Us', 'Contact', 'Terms & Conditions', 'Privacy Policy', 'Delivery', 'Returns & Exchange', 'FAQs'

]


class Footer extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container  justify={'center'} className={classes.root}>
                <Grid item justify={'center'} container spacing={8}>
                    {
                        footerOptions.map(
                            (n, i) => <Grid item key={i}>
                                <Typography variant={'title'} color={'inherit'}>
                                    {n}
                                </Typography>

                            </Grid>
                        )
                    }

                </Grid>

                <Grid item>
                    <Typography variant={'title'} color={'inherit'}>© 2018 Lazynoon. </Typography>
                </Grid>

            </Grid>);
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)