export default class ProductsCrud {
    constructor() {
        this.productsArr = [
            {
                id: 1,
                name: 'iPhone XR',
                price: 60000
            },
            {
                id: 2,
                name: 'Samsunh Galaxy S10+',
                price: 80000
            },
            {
                id: 3,
                name: 'Huawei View',
                price: 50000
            }
        ];
    }

    init() {
        this.eventButtons = document.querySelectorAll('.event-button')
        this.form = document.getElementById('modal-form');
        this.modal = document.querySelector('.modal');
        this.modalSaveBtn = document.querySelector('.modal-form__buttons_save');
        this.products = document.querySelector('.products');
        this.producstList = document.querySelector('.products-list__items');
        this.productsAddButton = document.querySelector('.products-header__add');

        this.events();
        this.updateList();
    }

    events() {
        this.modalSaveBtn.addEventListener('click', (e) => this.saveProduct(e));
        this.eventsOnce();
    }
    
    eventsOnce() {
        this.productsAddButton.addEventListener('click', () => this.showModal(), {once: true});
    }

    eventsDisable() {
        Array.from(this.eventButtons).forEach(item => {
            item.classList.add('btn-disable');
        });
    }

    eventsEnable() {
        Array.from(this.eventButtons).forEach(item => {
            item.classList.remove('btn-disable');
        });
        this.eventsOnce();
    }

    saveProduct(e) {
        e.preventDefault();
        // console.log(this.productsArr.length);
        let formData = new FormData(this.form);
        // for(let [name, value] of formData) {
        //     console.log(`${name} = ${value}`);
 
        //     } 
        const product = {
            id: +(this.productsArr.length + 1),
            name: formData.get('product_name'),
            price: +(formData.get('product_price')),
        }
        // console.log(product);
        this.productsArr.push(product);
        // console.log(this.productsArr);
        this.updateList();

    }

    showModal() {
        this.modal.classList.add('show');
        this.modal.style.left = (this.products.offsetWidth / 2) - (this.modal.offsetWidth / 2) + 'px';

        this.eventsDisable();
    }

    updateList() {
        this.producstList.innerHTML = '';

        this.productsArr.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.className = 'products-list__item';
            productDiv.dataset.id = item.id;

            productDiv.innerHTML = `
                <div class="products-name">${item.name}</div>
                <div class="products-price">${item.price}</div>
                <div class="products-actions">
                    <span class="products-actions__item event-button">✎</span>
                    <span class="products-actions__item event-button">✕</span>
                </div>            
            `;
            
            this.producstList.append(productDiv);
        })
    }
}