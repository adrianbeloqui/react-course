import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', display: 'Fastest'},
                        { value: 'cheapest', display: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token)
    }

    inputChangedHandler = (event, inputId) => {
        const updatedFormElement = updateObject(
            this.state.orderForm[inputId],
            {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
                touched: true
            }
        )

        const updateOrderForm = updateObject(
            this.state.orderForm,
            { [inputId]: updatedFormElement} 
        )

        let formIsValid = true
        for (let inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({
            orderForm: updateOrderForm,
            'formIsValid': formIsValid
        })
    }

    render() {
        const formsElementsArray = []
        for (let key in this.state.orderForm) {
            formsElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formsElementsArray.map(el => {
                        return (
                            <Input
                                key={el.id}
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                invalid={!el.config.valid}
                                shouldValidate={el.config.validation}
                                touched={el.config.touched}
                                changed={(e) => this.inputChangedHandler(e, el.id)}
                            />
                        )
                    })
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={ classes.ContactData }>
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}
    

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
