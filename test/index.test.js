//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const Order = require("../models/order")
const Order_details = require("../models/order_details")



const chai = require('chai');
const request = require('supertest');
const server = require('../server');

const { expect } = chai;

describe('POST api/user/signup user', async () => {
    it('it should save user data if user with same email not exist in db', async () => {
        const firstname = "ahmed"
        const middlename = "ahmed"
        const lastname = "ahmed"
        const email = "ahmed9@gmail.com"
        const phone = "01025896478"
        const password = "123456789"
        const { body, status } = await request(server).post('/api/user/signup').send({
            firstname,
            middlename,
            lastname,
            email,
            phone,
            password,

        });
        const { result } = body;
        expect(status).to.equal(201);
        expect(result.firstname).to.equal(firstname);
    });
    it("should throw an error if user with same email  exist in db ", async function () { });

});


describe('POST  api/user/login user', async () => {
    it('it should retrun token  if user email and  password corrrect ', async () => {

        const email = "ahmed9@gmail.com"
        const password = "123456789"
        const { body, status } = await request(server).post('/api/user/login').send({
            email,
            password,

        });
        expect(status).to.equal(200);
    });
    it("should throw an error if user email or passwor wrong ", async function () { });

});



describe('POST  api/order/create ', async () => {
    it('it should retrun order if exists req.userData.userId and all procuts in array exists ', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkOUBnbWFpbC5jb20iLCJpZCI6OCwiaWF0IjoxNjYxOTIwODk0LCJleHAiOjE2NjIwMDcyOTR9.vr8g6spE6NUsfa6Llj7A5bQOSJhZH5GHd0o5cWnb_4g "
        const products = [{ id: 1, price: 5000, quantity: 2 }, { id: 2, price: 8000, quantity: 1 }]
        const { body, status } = await
            request(server)
                .post('/api/order/create')
                .set({ 'authorization': "Bearer "+token })
                .send({
                    products,
                });
        expect(status).to.equal(201);
    });
    it("should throw an error if not userid in headers or any of products not found ", async function () { });

});



describe('GET  api/order/userorders/:userId ', async () => {
    it('it should GET all specific user orders', async () => {
        const userId = 1
        const { body, status } = await request(server).get('/api/order/userorders' + userId);
        const { data } = body;
        expect(status).to.equal(200);
    });
});


describe('PUT /api/order/accept/:id  ', async () => {
    it('it should upate order status to accepted  ', async () => {
        let id = 1;
        const { body, status } = await request(server).put('/api/order/accept/' + id);
        expect(status).to.equal(200);
    });
    it('it should throw error if order not found  ', async () => { });
});

describe('PUT /api/order/reject/:id', async () => {
    it('it should upate order status to rejected  ', async () => {
        let id = 1;
        const { body, status } = await request(server).put('/api/order/reject/' + id);
        expect(status).to.equal(200);
    });
    it('it should throw error if order not found  ', async () => { });
});
