import request from 'supertest'
import server from '../src/server'

describe('API Product Endpoints', () => {
    it('should return listing with records', async () => {
        const res = await request(server).get('/api/products?page=1&size=4');
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(4)
    });

    it('should return listing with no records', async () => {
        const res = await request(server).get('/api/products?page=50');
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should create new product', async () => {
        const res = await request(server).post('/api/products')
            .send({
                code: 'P102',
                name: 'Tall Basket',
                category: 'Home Decoration',
                brand: "MeU",
                type: "Basket",
                description: 'The next super product of the year.',
            });
        expect(res.status).toEqual(200);
    });

    it('should update existing product', async () => {
        const res = await request(server).put('/api/products/P101')
            .send({
                name: 'Tall Basket',
                category: 'Home Decoration',
                brand: "MeU",
                type: "Basket",
                description: 'The next super product of the year.',
            });
        expect(res.status).toEqual(200);
    });

    it('should delete existing product', async () => {
        const res = await request(server).delete('/api/products/P005');
        expect(res.status).toEqual(200);
    });

    it('should throw error when update, delete without code', async () => {
        let res = await request(server).delete('/api/products/');
        expect(res.status).toEqual(404);
        res = await request(server).put('/api/products/');
        expect(res.status).toEqual(404);
        // res = await request(server).get('/api/products/');
        // expect(res.status).toEqual(404);
    })

    it('should throw error missing record in database', async () => {
        const res = await request(server).get('/api/products/bad_code');
        expect(res.status).toEqual(500);
    })

    it('should throw error when insert, update or delete a record', async () => {
        let res = await request(server).post('/api/products').send({
            code: 'P102'
        });
        expect(res.status).toEqual(500);
        res = await request(server).put('/api/products/P102')
        expect(res.status).toEqual(500);
        res = await request(server).put('/api/products/P11111')
        expect(res.status).toEqual(500);
    })
})