const mongoose = require('mongoose');
const request = require('supertest');
const Post = require('../model/post');
let app;

describe('GET /posts', () => {
    beforeAll(async () => {
        process.env.MONGODB_URL = 'mongodb://localhost:27017/testdb';
        app = require('../app');
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });

    beforeEach(async () => {
        await Post.deleteMany({});
        await Post.create({
            title: 'API Test Post',
            author: { id: new mongoose.Types.ObjectId(), name: 'API Author' },
            content: 'API content',
            status: 'published',
        });
    });

    it('should return all posts', async () => {
        const res = await request(app).get('/posts');
        expect(res.statusCode).toBe(200);
        expect(res.body.posts).toBeInstanceOf(Array);
        expect(res.body.posts.length).toBe(1);
        expect(res.body.posts[0].title).toBe('API Test Post');
    });
}); 