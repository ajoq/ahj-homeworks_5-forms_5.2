export default class ProductsCrud {
    constructor(products) {
        this.productsArr = [];
        if (products) this.productsArr = products;
    }

    init() {
        this.form = document.forms.addUpdateProduct;
        this.deleteConfirm = document.querySelector('.delete');
        this.modal = document.querySelector('.modal');

        this.productSaveBtn = document.querySelector('.product-form__buttons_save');
        this.productCancelBtn = document.querySelector('.product-form__buttons_reset');

        this.products = document.querySelector('.products');
        this.productsDeleteItem = document.querySelector('.delete-product');
        this.producstList = document.querySelector('.products-list__items');
        this.productsAddButton = document.querySelector('.products-header__add');
        
        this.editProductId = null;
        this.editProductArrIndex = null;
        this.lastProductId = this.productsArr.length;

        this.events();
        this.updateList();
    }
    
    events() {
        this.productSaveBtn.addEventListener('click', (e) => this.productSave(e));
        this.productCancelBtn.addEventListener('click', (e) => this.productCancel(e));
        this.products.addEventListener('click', (e) => this.eventsButtons(e));

        // this.eventsOnce(); // События с параметром once: true
    }

    // eventsOnce() {
    //     this.products.addEventListener('click', (e) => this.eventsButtons(e), {once: true});
    //     // this.products.addEventListener('click', this.eventsButtons.bind(this), {once: true});
    // }
    
    eventsDisable() {
        this.eventButtons = document.querySelectorAll('.event-button');
        Array.from(this.eventButtons).forEach(item => {
            item.classList.add('btn-disable');
        });
    }

    eventsButtons(e) {
        // Проверки не было при попытке использования eventsOnce
        if (this.modal.classList.contains('show')) {
            return;
        }

        if (e.target.classList.contains('add-btn')) {
            this.showModal(this.form);
        };        
        if (e.target.classList.contains('edit-btn')) {
            this.productEdit(e.target);
        };
        if (e.target.classList.contains('delete-btn')) {
            this.productDelete(e.target);
        };
    }
    
    eventsEnable() {
        this.eventButtons = document.querySelectorAll('.event-button');
        Array.from(this.eventButtons).forEach(item => {
            item.classList.remove('btn-disable');
        })
        // this.eventsOnce();
    }
    
    productCancel(e) {
        e.preventDefault();

        this.form.reset();
        this.form.classList.remove('show');
        this.modal.classList.remove('show');

        this.eventsEnable();
        this.editProductId = null;
        this.editProductArrIndex = null;
    }

    productEdit(tag) {
        this.editProductId = +(tag.closest('div.products-list__item').dataset.id);
        this.editProductArrIndex = this.productsArr.findIndex((item) => item.id === this.editProductId);

        this.showModal(this.form);
        this.form.elements.name.value = this.productsArr[this.editProductArrIndex].name;
        this.form.elements.price.value = this.productsArr[this.editProductArrIndex].price;
    }

    productDelete(tag) {
        const delProductId = +(tag.closest('div.products-list__item').dataset.id);
        const delProductArrIndex = this.productsArr.findIndex((item) => item.id === delProductId);
        this.showModal(this.deleteConfirm);
        this.productsDeleteItem.innerHTML = this.productsArr[delProductArrIndex].name;

        const deleteButtons = document.querySelector('.delete-buttons');

        deleteButtons.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-buttons_save')) {
                this.productsArr.splice(delProductArrIndex, 1);
                this.updateList();
                this.productDeleteCloseModal();
                return;
            }
            if (e.target.classList.contains('delete-buttons_reset')) {
                this.productDeleteCloseModal(); 
                return;
            }
        }, {once : true});
    }

    productDeleteCloseModal() {
        this.deleteConfirm.classList.remove('show');
        this.modal.classList.remove('show');
        this.eventsEnable();
    }

    productSave(e) {
        e.preventDefault();

        const product = {
            id: +(this.lastProductId + 1),
            name: this.form.elements.name.value,
            price: +(this.form.elements.price.value),
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
        
        this.updateList();
        this.eventsEnable();
    }

    showModal(element) {
        element.classList.add('show');
        this.modal.classList.add('show');
        this.modal.style.left = (this.products.offsetWidth / 2) - (this.modal.offsetWidth / 2) + 'px';

        if (this.form.classList.contains('show')) {
            this.form.elements.name.focus();
        }

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