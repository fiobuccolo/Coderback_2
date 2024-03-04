import { faker } from '@faker-js/faker';


export const generateProducts = () => {
    let numOfProducts = parseInt(faker.random.numeric(1, { bannedDigits: ['0'] }));
    for (let i = 0; i < numOfProducts; i++) {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 0, max: 100 }),
        id: faker.database.mongodbObjectId(),
    }
}}
;


// https://fakerjs.dev/api/


