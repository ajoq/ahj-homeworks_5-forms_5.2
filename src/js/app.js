import ProductsCrud from './ProductsCrud';

const demoContent =  [
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
const products = new ProductsCrud(demoContent);
products.init();