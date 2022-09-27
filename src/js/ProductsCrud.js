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
        this.form = document.forms.addUpdateProduct;
        this.modal = document.querySelector('.modal');
        this.modalSaveBtn = document.querySelector('.modal-form__buttons_save');
        this.modalCanselBtn = document.querySelector('.modal-form__buttons_reset');
        this.products = document.querySelector('.products');
        this.producstList = document.querySelector('.products-list__items');
        this.productsAddButton = document.querySelector('.products-header__add');
        
        this.editProductId = null;
        this.editProductArrIndex = null;
        this.lastProductId = 3;

        this.events();
        this.updateList();
    }
    
    cancel(e) {
        e.preventDefault();

        this.form.reset();
        this.modal.classList.remove('show');

        this.eventsEnable();
        this.editProductId = null;
        this.editProductArrIndex = null;
    }

    events() {
        this.modalSaveBtn.addEventListener('click', (e) => this.productSave(e));
        this.modalCanselBtn.addEventListener('click', (e) => this.cancel(e));
        this.producstList.addEventListener('click', (e) => this.eventsEditDelete(e));
        this.eventsOnce();
    }
    
    eventsDisable() {
        this.eventButtons = document.querySelectorAll('.event-button');
        Array.from(this.eventButtons).forEach(item => {
            item.classList.add('btn-disable');
        });
    }

    eventsEditDelete(e) {
        if (e.target.classList.contains('edit-btn')) {
            this.productEdit(e.target);
        };
        if (e.target.classList.contains('delete-btn')) {
            this.productDelete(e.target);
        };
    }
    
    eventsEnable() {
        this.eventBtns = document.querySelectorAll('.event-button');
        Array.from(this.eventBtns).forEach(item => {
            item.classList.remove('btn-disable');
        })
        this.eventsOnce();
    }
    
    eventsOnce() {
        this.productsAddButton.addEventListener('click', () => this.showModal(), {once: true});
    }

    productEdit(tag) {
        this.editProductId = +(tag.closest('div.products-list__item').dataset.id);
        this.editProductArrIndex = this.productsArr.findIndex((item) => item.id === this.editProductId);

        this.showModal();
        this.form.elements.name.value = this.productsArr[this.editProductArrIndex].name;
        this.form.elements.price.value = this.productsArr[this.editProductArrIndex].price;
    }

    productDelete(tag) {
        const delProductId = +(tag.closest('div.products-list__item').dataset.id);
        const delProductArrIndex = this.productsArr.findIndex((item) => item.id === delProductId);
        this.productsArr.splice(delProductArrIndex, 1);
        this.updateList();
    }

    productSave(e) {
        e.preventDefault();
        let formData = new FormData(this.form);
        const product = {
            id: +(this.lastProductId + 1),
            name: formData.get('product_name'),
            price: +(formData.get('product_price')),
        }

        if (this.editProductId) {
            product.id = this.editProductId;
            this.productsArr.splice(this.editProductArrIndex, 1, product);
            this.editProductId = null;
            this.editProductArrIndex = null;

        } else {
            this.productsArr.push(product);
            this.lastProductId += 1;
        }

        this.form.reset();
        this.modal.classList.remove('show');

        this.eventsEnable();
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
                    <span class="products-actions__item edit-btn event-button">✎</span>
                    <span class="products-actions__item delete-btn event-button">✕</span>
                </div>            
            `;
            
            this.producstList.append(productDiv);
        })
    }
}