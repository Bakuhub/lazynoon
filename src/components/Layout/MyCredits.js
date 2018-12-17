import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Grid} from '@material-ui/core'
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import NavBar from './NavBar'
import Dialog from '../Widget/Dialog'

const styles = theme => ({

    root: {
        paddingRight: '50px',
        position: 'sticky',
        top: '95vh',
        height: 0,
        zIndex: 10000,
    },
    button: {
        color: 'white',
        transition: '0.2s',
        backgroundColor: 'black',
        '& :hover': {
            color: 'black',

        }
    }


})


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
        const {classes, width} = this.props;
        const {value} = this.state

        return (
            <Grid container justify={'flex-end'} className={classes.root}>
                <Dialog
                    innerRef={e => this.dialog = e}
                    title={
                        <Button className={classes.button}>My Credits</Button>
                    }
                    dialog={<NavBar
                        handleClose={() => this.dialog.handleClose()}
                    />}
                />

            </Grid>
        )

    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(Header))))