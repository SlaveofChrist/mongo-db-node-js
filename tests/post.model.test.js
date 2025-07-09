const mongoose = require('mongoose');
const Post = require('../model/post');

describe('Post Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();
    });

    it('should create a post with required fields and default values', async () => {
        const post = new Post({
            title: 'Test Post',
            author: { id: new mongoose.Types.ObjectId(), name: 'Test Author' },
            content: 'Test content',
        });
        const savedPost = await post.save();
        expect(savedPost.title).toBe('Test Post');
        expect(savedPost.status).toBe('draft');
        expect(savedPost.likes).toBe(0);
        expect(savedPost.createdAt).toBeInstanceOf(Date);
        expect(savedPost.updatedAt).toBeInstanceOf(Date);
    });

    it('should update updatedAt on save', async () => {
        const post = new Post({
            title: 'Update Date',
            author: { id: new mongoose.Types.ObjectId(), name: 'Author' },
            content: 'Content',
        });
        await post.save();
        const oldUpdatedAt = post.updatedAt;
        post.content = 'Updated content';
        await new Promise((r) => setTimeout(r, 10)); // ensure time difference
        await post.save();
        expect(post.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it('should require title, author, and content', async () => {
        const post = new Post({});
        let err;
        try {
            await post.validate();
        } catch (e) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors.title).toBeDefined();
        expect(err.errors['author.id']).toBeDefined();
        expect(err.errors['author.name']).toBeDefined();
        expect(err.errors.content).toBeDefined();
    });
}); 