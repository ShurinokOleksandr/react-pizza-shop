import emptyCart from "../../assets/img/empty-cart.png";
import React from "react";

export const EmptyCart = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая <icon>😕</icon></h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.<br/>
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCart} alt="Empty cart"/>
            <a href="/react-pizza-shop" className="button button--black">
                <span>Вернуться назад</span>
            </a>
        </div>
    )
}