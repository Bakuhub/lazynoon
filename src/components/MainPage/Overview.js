import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Carousel from '../Widget/Slick/MainPage'
import {connect} from 'react-redux'
import CategoryOverviewBox from '../Widget/CategoryOverviewBox'
import LoadingPage from '../Layout/LoadingPage'
import {refactorTextLength} from "../../api/ApiUtils";
import ProductOverviewBox from '../Widget/Product/overviewBox'

const styles = theme => (
    {

        imgWallElement: {
            width: '100%',
            height: '100%',
        }
    })


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {

    render() {
        const {classes} = this.props
        return (
            (this.props.feeds && this.props.products) ?
                <Grid container>
                    <Grid item xs={12}>
                        <Carousel
                            data=
                                {[{
                                    url: '/img/MainPage/slick/slick1.jpg',
                                },
                                    {
                                        url: '/img/MainPage/slick/slick2.jpg',
                                    },
                                ]
                                }/>
                    </Grid>


                    <Grid item xs={12} container alignItems={'center'} direction={'column'}>
                        <Typography variant={'display1'}>
                            Be the first to know!
                        </Typography>
                        <Typography variant={'subheading'}>
                            Sign up to our newsletter and we’ll keep you up to date with the latest arrivals
                        </Typography>
                        <Typography variant={'display1'}>
                            Subscribe
                        </Typography>
                    </Grid>

                    <Grid item container spacing={0} xs={12}>
                        {
                            new Array(4).fill(null).map(
                                (n, i) => <Grid item xs={6}><img
                                    className={classes.imgWallElement}
                                    src={`/img/MainPage/imgWall/imgWall${i + 1}.jpg`}
                                /></Grid>
                            )
                        }

                    </Grid>

                    <Grid item container alignItems={'center'} justify={'center'} className={classes.productCategory}>
                        <Grid item lg={5} xs={12} container justify={'center'}>
                            <Typography variant={'display1'} className={classes.title}>
                                PRODUCT CATEGORIES
                            </Typography>
                            <Typography variant={'subheading'} className={classes.text}>
                                Variety of product categories, tens of products, only five-stars reviews. Browse the
                                collections
                                right now.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10}>
                            <CategoryOverviewBox
                                category={this.props.category}
                            />
                        </Grid>

                    </Grid>

                    {this.props.products.map((n, y) => <Grid item xs={4}> <ProductOverviewBox
                        key={y}
                        id={n.id}
                        name={refactorTextLength(n.name)}
                        src={((n.photos || [])[0] || {}).url}
                        category={n.tags}
                        regPrice={(n.variants || [])[0] ? n.variants[0].price : 'not a reg price'}
                        promotePrice={n.promotePrice}
                    /></Grid>)}


                </Grid> : <LoadingPage/>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))