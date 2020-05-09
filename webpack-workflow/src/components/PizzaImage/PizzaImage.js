import React from 'react'

import classes from './PizzaImage.css'
import PizzaImg from '../../assets/pizza.jpg'

const pizzaImage = (props) => (
    <div className={classes.PizzaImage}>
        <image src={PizzaImg} className={classes.PizzaImg} />
    </div>
)

export default pizzaImage
