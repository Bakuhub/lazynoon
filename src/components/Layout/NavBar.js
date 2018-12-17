import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";

const styles = theme => ({

    root: {
        paddingTop: '110px',
        background: 'none',
        borderBottom: '1px solid ' + theme.palette.secondary.light,
    },
});


const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    keyword: state.common.searchBar,

});


const mapDispatchToProps = dispatch => ({
        editShoppingCart: (index) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: 'remove',
                value: index,

            }
        }),
        editSearchBar: (keyword = null) => dispatch({
            type: COMMON_EDIT_SEARCH_BAR,
            payload: keyword
        })
    }

)

class Header extends React.Component {
    handleChange = (event, value) => {
        this.setState({value});
    };

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        };
    }

    render() {
        const {classes, handleClose} = this.props;
        const {value} = this.state

        return (
            <Grid className={classes.root}
                  container
                  alignItems={'center'}
                  direction={'column'}
            >

                <Grid item>
                    <Typography
                        variant={'display1'}
                        onClick={handleClose}
                    >
                        New In
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'display1'}>
                        Clothing
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'display1'}>
                        Designer Jewellery </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'display1'}>
                        Shoes & Bags
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'display1'}>
                        Socks
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'display1'}>
                        Sales
                    </Typography>
                </Grid>
            </Grid>
        )


    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(Header))))