import React from 'react';
import {Grid} from '@material-ui/core';
import List from '../Widget/List'
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import {getTagsCountsArray, numberToPagination, refactorTextLength, sort_by} from "../../api/ApiUtils";
import ProductOverviewBox from '../Widget/Product/overviewBox'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Header from '../Layout/Body/Header'
import WhiteDropDown from '../Widget/WhiteDropDown'

const styles = theme => ({
    productCategory: {

    },
    root:{
        backgroundColor: theme.palette.background.default,

    },
    paddingItem: {
        padding: '40px',            inputBackground: '#F9F9F9',


    },
    listMode: {
        padding: '20px',
    },
    array: {
        paddingLeft: '5px',
    }
})

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
    filter: state.product.filter,
});


const mapDispatchToProps = dispatch => ({

        changeViewMode: (mode) =>
            dispatch({
                    type: EDIT_PRODUCT_VIEW_MODE,
                    payload: mode,
                }
            )
        ,
        editProductSort: (key, value) => dispatch({
            type: PRODUCT_EDIT_SORT,
            payload: {
                key: key,
                value: value,
            },
        }),
        editProductFilter: (key, value) => dispatch({
            type: PRODUCT_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),
    }
)

class ShopOverview extends React.Component {


    sortData = () => {
        let data = Array.from(this.props.products)
        data = data.filter(n => (this.props.filter.tag) ? !!n.tags.find(k => k === this.props.filter.tag) : true)
        let sortBy = () => {
            switch (this.props.sort.sortBy) {
                case 'Name A-Z':
                    return data.sort(sort_by('name', null))
                case 'Name Z-A':
                    return data.sort(sort_by('name', null, true))
                case 'Price Low to High':
                    return data.sort((a, b) => {
                            let priceA = a.variants[0] ? a.variants[0].price : 0
                            let priceB = b.variants[0] ? b.variants[0].price : 0
                            return (priceA < priceB) ? -1 : 1
                        }
                    )
                case       'Price High to Low':
                    return data.sort((a, b) => {
                            let priceA = a.variants[0] ? a.variants[0].price : 0
                            let priceB = b.variants[0] ? b.variants[0].price : 0
                            return (priceA > priceB) ? -1 : 1
                        }
                    )
                default:
                    return data
            }
        }
        return sortBy()

    }
    getProductProperty = (products, type) => {
        switch (type) {
            case 'display':
                if (this.props.sort.page) {
                    let range = this.props.sort.page.split(' - ')
                    return products.filter((n, i) => (i >= range[0] - 1 && i <= range[1] - 1))

                }
                return products
            case 'length':
                return products.length

        }
    }
    initPageNumber = length => this.props.editProductSort('page', numberToPagination(length, null)[0].label)
    getTagsList = () => <List
        data={getTagsCountsArray(this.props.products, (tag, number) => {
            this.popUp && this.popUp.handleClose()
            this.props.editProductFilter('tag', tag)
            this.initPageNumber(number)
        })}
        selectedValue={this.props.filter.tag}
    />

    render() {
        const {classes} = this.props
        const products = this.sortData()
        const filterOptions = ['Name A-Z', 'Name Z-A', 'Price Low to High', 'Price High to Low']
        return (
            <Grid container className={classes.root}>
                <Grid item lg={12} justify={'center'} spacing={isWidthUp('md', this.props.width) ? 16 : 0} container>
                    <Grid item xs={12}>
                        <Header
                            title={'products'}
                        />
                    </Grid>

                    <Grid item xs={5}/>
                    <Grid item xs={2}>
                        <WhiteDropDown
                            label={'sort by: '}
                            icon2={'icon-circle-down'}
                            options={
                                filterOptions.map(n => ({
                                    label: n,
                                    onClick: () => console.log(n),
                                }))
                            }
                        />
                    </Grid>
                    <Grid item xs={5}/>

                    <Grid item lg={12} container className={classes.listMode}>
                        {

                            this.getProductProperty(products, 'display').map((n, i) =>
                                <Grid item xs={4}
                                      className={classes.paddingItem}
                                      key={i}
                                >
                                    <ProductOverviewBox
                                        name={refactorTextLength(n.name)}
                                        id={n.id}
                                        src={n.photos[0].url}
                                        category={n.tags}
                                        regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                                        promotePrice={n.promotePrice}
                                    />
                                </Grid>
                            )}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopOverview)))