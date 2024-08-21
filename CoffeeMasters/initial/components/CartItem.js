import { removeFromCart } from "../services/Order.js";

export default class CartItem extends HTMLElement {
    constructor() {
        super();    
    }   

    connectedCallback() {
        const item = JSON.parse(this.dataset.item);
        this.innerHTML = ""; // Clear the element

        const template = document.getElementById("cart-item-template");


        function interpolate(str, params) {
            let names = Object.keys(params);
            let values = Object.values(params); 
            const body = `return \`${str}\`;`;
            return new Function(...names, body)(...values);
        }

        this.innerHTML = interpolate(template.innerHTML, {
            qty: `${item.qty}x`,
            price: `$${item.product.price.toFixed(2)}`,
            name: item.product.name
        })

        this.querySelector("a.delete-button").addEventListener("click", event => {
            removeFromCart(item.product.id);
        })
    }
}

customElements.define("cart-item", CartItem);