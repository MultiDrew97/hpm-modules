"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbConfig = {
    options: {
        auth: {
            username: 'arandlemiller97',
            password: 'JasmineLove2697',
        },
        retryWrites: true,
        w: 'majority',
        dbName: 'HPM-Test',
    },
    desiredPage: 'HPM-Test',
    uri: `mongodb+srv://herbivores-password-man.wci8d.mongodb.net/`,
};
describe('Database User Schema', function () {
    beforeAll(async () => {
        await (0, mongoose_1.connect)(dbConfig.uri, dbConfig.options);
    });
    afterAll(async () => {
        await (0, mongoose_1.disconnect)();
    });
});
