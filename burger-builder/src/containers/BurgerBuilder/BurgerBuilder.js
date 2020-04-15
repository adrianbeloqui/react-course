import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}


class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: null,
            totalPrice: 4.0,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then( res => {
                if (! res.data ) {
                    throw res;
                }

                const ingredientsCost = Object.keys(res.data)
                    .map( igKey => {
                        return res.data[igKey] * INGREDIENT_PRICES[igKey]
                    })
                    .reduce( (total, amount) => {
                        return total + amount
                    }, 0)

                this.setState((previousState) => {
                    return {
                        ingredients: res.data,
                        error: false,
                        totalPrice: previousState.totalPrice + ingredientsCost,
                        purchaseable: ingredientsCost > 0
                    }
                })
            })
            .catch( err => {
                this.setState({
                    error: true
                })
            })
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
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
        }
        queryParams.push(`totalPrice=${encodeURIComponent(this.state.totalPrice)}`)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        })
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
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        
        if (this.state.ingredients) {
            burger = (
                <Aux >
                    <Burger ingredients={ this.state.ingredients } />
                    <BuildControls
                            ingredientAdded={ this.addIngredientHandler }
                            ingredientRemoved={ this.removeIngredientHandler }
                            disabled={ disabledInfo }
                            price={ this.state.totalPrice }
                            purchaseable={ this.state.purchaseable }
                            ordering={ this.purchaseHandler }
                        />
                </Aux>
            )
            orderSummary = (
                <OrderSummary 
                            ingredients={ this.state.ingredients }
                            price={ this.state.totalPrice }
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

export default withErrorHandler(BurgerBuilder, axios)
