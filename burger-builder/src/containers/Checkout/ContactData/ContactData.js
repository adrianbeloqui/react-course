import React, { Component } from 'react'

import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        this.setState({  loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Adrian Beloqui',
                address: {
                    street: 'Test Street',
                    zipcode: '11111',
                    country: 'United States'
                },
                email: 'dummy@dummy.com'
            },
            deliverMethod: 'fastest'
        }
        axios.post(
            '/orders.json',
            order
        )
            .then( res => {
                console.log(res)
                this.props.history.push('/')
            })
            .catch( err => {
                console.log(err)
            })
            .finally( () => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        let form = (
            <form>
                <input className={ classes.Input } type="text" name="name" placeholder="Your name" />
                <input className={ classes.Input } type="email" name="email" placeholder="Your email" />
                <input className={ classes.Input } type="text" name="street" placeholder="Street" />
                <input className={ classes.Input } type="text" name="postal" placeholder="ZIP Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
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

export default ContactData