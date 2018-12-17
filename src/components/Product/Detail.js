import React, {Fragment} from 'react';
import {Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import SocialIcon from '../Widget/SocialIcon'
import Counter from '../Widget/Counter'
import {formatMoney} from "../../api/ApiUtils";
import {CART_EDIT_VARIANT, CART_EMPTY_PRODUCT_VARIANT, CART_SAVE_PRODUCT_TO_CART} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import {withRouter} from 'react-router-dom'
import swal from 'sweetalert';
import ImgWall from './Comment&Description/ImgWall'
import ImgWallController from './Comment&Description/ImgWallController'
import WhiteDropDown from '../Widget/WhiteDropDown'
import Button from '../Widget/Button'
import SearchBar from '../Widget/SearchBar/original'
const styles = theme => {
    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
            price: {
                color: '#ffc98b',
            },
            statusLabel: {
                color: 'green',
                fontWeight: '600',
            }
        })

}


const mapStateToProps = state => ({
    draft: state.cart.variant,
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({
        editCartVariant: (key, value) => dispatch(
            {
                type: CART_EDIT_VARIANT,
                payload: {
                    key: key,
                    value: value,
                }
            }
        ),
        dispatchDraftToCart: (product, number, variantId) => dispatch({
                type: CART_SAVE_PRODUCT_TO_CART,
                payload: {
                    product: product,
                    number: number,
                    variantId: variantId,
                }
            }
        ),

        emptyCartVariant: () => dispatch({
            type: CART_EMPTY_PRODUCT_VARIANT,
        }),

    }
)

class ResponsiveDialog extends React.Component {

    getVariant = (keyName, index, variantOptions, needRender = true) => {
        let needInit = !(this.props.draft[keyName])
        if (needInit || !needRender) this.props.editCartVariant(keyName, variantOptions[index][0])
        return variantOptions[index].map(n => ({
            label: n,
            onClick: () => this.props.editCartVariant(keyName, n),
        }))

    }
    saveDraftToCart = () => {
        const {draft, product} = this.props
        let productCount = draft.number ? draft.number : 1
        let selectedVariantId = this.findSelectedVariant().id
        this.props.dispatchDraftToCart(product, productCount, selectedVariantId)
        swal("Congratulation!", " items added!", "success");

    }

    findSelectedVariant = () => {
        const {draft, product} = this.props
        let key = Object.keys(draft)
        let value = Object.values(draft)
        let selectedDescription = []
        key.map((keyName, index) => (keyName !== 'number') ? selectedDescription.push(keyName + ':' + value[index]) : null)
        const isSelectedProduct = variants => (!selectedDescription.map(description => variants.description.split(',').includes(description)).includes(false))
        return product.variants.find(n => isSelectedProduct(n))

    }
    initVariant = () => {
        const {variantKeys, variantOptions} = this.props
        this.props.emptyCartVariant()
        variantKeys.map((n, i) => this.getVariant(n, i, variantOptions, false))
        this.props.editCartVariant('number', 1)
    }

    componentDidMount() {
        this.initVariant()

    }

    componentDidUpdate(prevProps, prevState, snap) {
        if (this.props.location.pathname !== prevProps.location.pathname) this.initVariant()
    }


    render() {

        const {
            classes, name, promotePrice,
            description, variantKeys, variantOptions, product
        } = this.props
        console.log(this.props)
        const selectedVariant = this.findSelectedVariant()
        return (
            selectedVariant ?
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <ImgWall
                            tileData={(selectedVariant.photos.length > 0 ? selectedVariant : product).photos.map(n => ({img: n.url,}))}
                        />
                    </Grid>
                    <Grid item xs={12} container direction={'column'}>
                        <Grid item container spacing={16}>
                            <Grid item>
                                <Typography
                                    variant={'display2'}>{name}
                                </Typography>
                            </Grid>
                            <Grid item container direction={'row'}>
                                {promotePrice ? <Fragment>
                                        <Typography variant={'headline'}
                                                    className={classes.price}>$ {formatMoney(promotePrice)}</Typography>
                                        <Typography component={'del'} variant={'subheading'}
                                                    color={'secondary'}>$ {formatMoney(
                                            selectedVariant.price)}</Typography>
                                    </Fragment> :
                                    <Typography variant={'headline'}
                                                className={classes.price}>$ {formatMoney(
                                        selectedVariant.price)}</Typography>
                                }
                            </Grid>
                            <Grid item container direction={'row'} alignItems={'flex-end'}>
                                <Grid item>
                                    <Typography variant={'subheading'} className={classes.statusLabel}>
                                        In Stock</Typography></Grid>
                                <Grid item>

                                    <Typography variant={'title'}>
                                        SKU MH03</Typography></Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item container xs={7} spacing={32}>
                                {
                                    variantKeys.map((n, i) =>

                                        <Grid item  key={i}>
                                            <WhiteDropDown
                                                label={n}
                                                options={
                                                    this.getVariant(n, i, variantOptions)
                                                }
                                                selectedValue={this.props.draft[n]}
                                            />
                                        </Grid>
                                    )
                                }</Grid>

                                <Grid item xs={2}>
                                    <Counter
                                        number={this.props.draft.number}
                                        onChange={number => this.props.editCartVariant('number', number)}
                                    />

                                </Grid>
                                <Grid item xs={3}>

                                    <Button
                                        icon={'icon-cart'}
                                        value={'Add To Cart'}
                                        onClick={() => this.saveDraftToCart}
                                    />

                                </Grid>

                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant={'body1'}>
                                    {description}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item container direction={'column'} spacing={16}>
                            <Grid item container spacing={16}>
                                <Grid item>
                                    <Button
                                        icon={'icon-heart'}/>
                                </Grid>
                                <Grid item >
                                    <Button
                                        icon={'icon-mail2'}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        icon={
                                            'icon-coin-dollar'

                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid item>

                                <Typography variant={'title'}>
                                    SHARE THIS PRODUCT:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <SocialIcon type={'whatsapp'}
                                            onClick={() => window.open('https://web.whatsapp.com/send?text=' + window.location.href)}/>
                                <SocialIcon type={'facebook'}
                                            onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <ImgWallController
                            tileData={(selectedVariant.photos.length > 0 ? selectedVariant : product).photos.map(n => ({img: n.url,}))}
                        />
                    </Grid>
                </Grid> : <LoadingPage/>

        )

    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog)))
// <Dialog
// innerRef={e => this.dialog = e}
// title={}
// dialog={
// <Grid
//     style={
//         {
//             padding: '20px',
//         }
//     }
//     container direction={'column'} spacing={32} alignItems={'center'}>
//     <Grid item>
//         <Typography variant={'title'}>
//             do u want to add to cart?
//         </Typography>
//     </Grid>
//     <Grid item container spacing={32} justify={'center'}>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={this.saveDraftToCart}
//
//             >
//                 yes
//             </Button>
//         </Grid>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={() => this.dialog.handleClose()}>
//                 no
//             </Button>
//         </Grid>
//     </Grid>
// </Grid>
// }
// />
