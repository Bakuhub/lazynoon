import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, BottomNavigation, BottomNavigationAction, Grid, Input} from '@material-ui/core';
import Button from '../Widget/Button'
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import PopUp from '../Widget/PopUp'
import SearchIcon from '@material-ui/icons/Search';
import DropDownList from './Body/ShoppingCartList'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import {redirectUrl} from "../../api/ApiUtils";

const styles = theme => ({
    logo: {
        '&:hover': {
            boxShadow:
                '2px 2px 0px 0px rgba(237,237,237,1)'
        },
        width: '80px',
    },
    root: {
        backgroundColor: 'white',
        borderBottom: '1px solid ' + theme.palette.secondary.light,
    },
    appBar: {
        position:'absolute',
        zIndex:'4000',
        backgroundColor: 'none',
        color: 'black',
        width: '100%',
        padding: '10px',
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
    getInputBar = () =>
        <Input
            onKeyDown={e =>
                (e.key === 'Enter' && this.state.keyword) ? redirectUrl('/search/' + this.state.keyword,this.props.history) : null
            }
            onChange={e => this.setState({keyword: e.target.value})}

            placeholder="Search…"
            classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput,
            }}
        />

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        };
    }

    render() {
        const {classes, width} = this.props;
        const {value} = this.state
        if (isWidthUp('md', width)) {

            return (
                    <Grid  className={classes.appBar} container alignItems={'center'} justify={'space-between'}>
                        <Grid item xs={2}>
                            <img
                                className={classes.logo}
                                onClick={() =>redirectUrl('/',this.props.history)}
                                src={'https://brandmark.io/logo-rank/random/pepsi.png'}
                            />
                        </Grid>
                        <Grid item >
                            <img
                                className={classes.logo}
                                src={'/img/MainPage/header/logo.png'}
                            />
                        </Grid>
                        <Grid item >

                        <span className={classNames('icon-cart')}/>
                        </Grid>
                    </Grid>
            )

        }
        return<BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>

            <BottomNavigationAction label="Home" value="Home"
                                    onClick={() => redirectUrl('/',this.props.history)}
                                    icon={<span className={classNames('icon-home', classes.icon)}/>}/>

            <BottomNavigationAction label="Products" value="Products"
                                    onClick={() => redirectUrl('/products',this.props.history)}

                                    icon={<span className={classNames(classes.icon, 'icon-gift')}/>}/>

            <BottomNavigationAction label="Feeds" value="Feeds"
                                    onClick={() => redirectUrl('/feeds',this.props.history)}
                                    icon={<span className={classNames(classes.icon, 'icon-file-text')}/>}/>
            <BottomNavigationAction label="Checkout" value="Checkout"
                                    onClick={() => redirectUrl('/checkout',this.props.history)}
                                    icon={<span className={classNames(classes.icon, 'icon-coin-dollar')}/>}/>

        </BottomNavigation>


    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(Header))))