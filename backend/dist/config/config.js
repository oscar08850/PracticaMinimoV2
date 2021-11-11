"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/minim1oscar2',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};
