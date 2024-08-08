const mongoose = require('mongoose');
const models = require('./models');

class DatabaseService {
    constructor(uri, options = {}) {
        this.uri = uri;
        this.options = options;
        this.models = {};
        this.loadModels();
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, {
                ...this.options,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB successfully');
            this.loadModels();
        } catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
            throw error;
        }
    }

    loadModels() {
        Object.keys(models).forEach((key) => {
            this.models[models[key].name] = models[key].model;
        });
    }

    getModel(modelName) {
        if(!this.models[modelName]) {
            throw new Error(`Model ${modelName} not found`);
        }

        return this.models[modelName];
    }
}

module.exports = DatabaseService;