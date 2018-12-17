import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import {Grid, Typography} from '@material-ui/core';
import {formatMoney, redirectUrl} from "../../../api/ApiUtils";
import {withRouter} from "react-router-dom";
import classNames from 'classnames'

const styles = theme => ({
    name: {
        textTransform: 'uppercase',
        fontSize: '17px',
        cursor: 'pointer',
        marginBottom: '15px',
        color: theme.palette.primary.dark,

        '&:hover': {
            color: theme.palette.secondary.dark,

        }
    }, category: {
        fontSize: '13px',
        color: theme.palette.secondary.light,
        marginTop: '15px',
    },
    root: {
        position:'relative',
        width: '100%',
    },
    img: {
        cursor: 'pointer',
        width: '100%',
        height: '320px !important',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8'
    },

    price: {
        color: '#333333',
        fontFamily: 'arial',
        lineHeight: 1,
    },
    hiddenContent: {
        top:'30%',
        position: 'absolute',
        display: 'none'
    },

    flowingDown: {
        '&:hover >div': {
            display: 'block',
        },
        '&:hover >div >img': {
            transition: '0.5s',
            opacity: '0.2',
        }

    }

})


class ResponsiveDialog extends React.Component {

    styles = theme => ({
        content: {
            "padding": this.props.padding,
            "min-height": "100vh",
            "background-color": this.props.backgroundColor
        }
    })
    handleClickOpen = () => this.setState({open: true});

    handleClose = () => {
        this.setState({open: false});
    };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

    render() {
        const {classes, src, name, id, category, regPrice, promotePrice} = this.props;

        return (
            <Grid

                container className={classNames( classes.root,classes.flowingDown)}
                direction={'column'}
                alignItems={'center'}
                onClick={() => id && redirectUrl('/products/' + id, this.props.history)}

            >
                <Grid item>
                    <img src={src}
                         className={classes.root}
                    />
                </Grid>
                <Grid item xs={12} className={classes.hiddenContent}>

                    {
                        category && <Typography variant={'headline'}
                                                className={classes.category}
                                                color={'primary'}>{category && category.join(',')}</Typography>

                    }
                    <Typography variant={'title'}
                                onClick={() => window.location.href = ('/products/' + id)}
                                className={classes.name}
                    >{name}</Typography>
                    {
                        (promotePrice) ?
                            <Grid item container direction={'row'}>
                                <Typography component={'del'} variant={'subheading'}
                                            className={classes.oldPrice}>$ {formatMoney(regPrice)}</Typography>
                                <Typography variant={'caption'}
                                            className={classes.price}>${formatMoney(promotePrice)}</Typography>
                            </Grid>
                            : <Typography variant={'caption'}
                                          className={classes.price}>$ {formatMoney(regPrice)}</Typography>
                    }
                </Grid>
            </Grid>
        );
    }

}


export default withRouter(withStyles(styles)(ResponsiveDialog))