import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount () {
        // axios.get('/ingredients.json')
        //     .then( res => {
        //         if (! res.data ) {
        //             throw res;
        //         }

        //         const ingredientsCost = Object.keys(res.data)
        //             .map( igKey => {
        //                 return res.data[igKey] * INGREDIENT_PRICES[igKey]
        //             })
        //             .reduce( (total, amount) => {
        //                 return total + amount
        //             }, 0)

        //         this.setState((previousState) => {
        //             return {
        //                 ingredients: res.data,
        //                 error: false,
        //                 totalPrice: previousState.totalPrice + ingredientsCost,
        //                 purchaseable: ingredientsCost > 0
        //             }
        //         })
        //     })
        //     .catch( err => {
        //         this.setState({
        //             error: true
        //         })
        //     })
    }

    purchaseCancelHandler = () => {
        this.setState({ 
            purchasing: false
        })
    }

    purchaseHandler = () => {
        this.setState({ 
            purchasing: true
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(
                igKey => {
                    return ingredients[igKey]
                }
            )
            .reduce((total, amount) => {
                return total + amount
            }, 0)
        return sum > 0
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        
        if (this.props.ings) {
            burger = (
                <Aux >
                    <Burger ingredients={ this.props.ings } />
                    <BuildControls
                            ingredientAdded={ this.props.onIngredientAdded }
                            ingredientRemoved={ this.props.onIngredientRemoved }
                            disabled={ disabledInfo }
                            price={ this.props.price }
                            purchaseable={ this.updatePurchaseState(this.props.ings) }
                            ordering={ this.purchaseHandler }
                        />
                </Aux>
            )
            orderSummary = (
                <OrderSummary 
                            ingredients={ this.props.ings }
                            price={ this.props.price }
                            purchaseCancelled={ this.purchaseCancelHandler }
                            purchaseContinued={ this.purchaseContinueHandler }
                        />
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const dispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: igName}),
        onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName})
    }
}

export default connect(mapStateToProps, dispatchToProps)(withErrorHandler(BurgerBuilder, axios))
