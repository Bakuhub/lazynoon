import React, {Fragment} from 'react';
import {Dialog} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({

    dialog: {
        backgroundColor: 'white',
        opacity:'0.91'
    },
});


class ResponsiveDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {

        this.setState({open: false});
    };
    //in parent
    //                                innerRef={e => this.popUp = e}
//this.popUp.handleClose()

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

    render() {
        const {fullScreen, dialog,classes, title} = this.props;

        return (
            <Fragment>
                <span onClick={this.handleClickOpen}>{title}</span>
                <Dialog
                    className={classes.dialog}
                    fullScreen={fullScreen ? (fullScreen) : false}
                    open={this.state.open}
                    onClose={this.handleClose}
                >

                    {dialog}
                </Dialog>
            </Fragment>
        );
    }
}


export default withStyles(styles)(ResponsiveDialog)