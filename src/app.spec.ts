const request = require('supertest');
import { app } from './app';

const OBJECT_TEST_API = {
                    name: "Rick",
                    email: "email@email.com",
                    first_keyword: "Rickelme",
                    second_keyword: "Dias",
                    website_url: "rickelmedias.dev"
};

describe("POST /findme" , () => {
    describe("Sending all informations correctly", () => {
        it("should return status 200", async () => {
            const res = await request(app).post("/findme").send(OBJECT_TEST_API);
            expect(res.statusCode).toEqual(200);
        });
    });

    describe("Not sending the name", () => {
        it("should return the error message to name field (empty field)", async () => {
            const res = await request(app).post("/findme").send({...OBJECT_TEST_API, name: ""});

            expect(res.error.text).toEqual('{"name":{"error":"You must define the name.","field_type":"<string>"}}');
        });
    });

    describe("Not sending the email field (empty field)", () => {
        it("should return the error message to email field", async () => {
            const res = await request(app).post("/findme").send({...OBJECT_TEST_API, email: ""});
                
            expect(res.error.text).toEqual('{"email":{"error":"You must define the email.","field_type":"<string>"}}');
        });
    });

    describe("Not sending the first_keyword field (empty field)", () => {
        it("should return the error message to email field", async () => {
            const res = await request(app).post("/findme").send({...OBJECT_TEST_API, first_keyword: ""});

            expect(res.error.text).toEqual('{"first_keyword":{"error":"You must define the first keyword.","field_type":"<string>"}}');
        });
    });

    describe("Not sending the second_keyword field (empty field)", () => {
        it("should return status 200 because the second_keyword is not an obligation", async () => {
            const res = await request(app).post("/findme").send({...OBJECT_TEST_API, second_keyword: ""});

                expect(res.statusCode).toEqual(200);
        });
    });
    
    describe("Sending other data type for second_keyword field", () => {
        it("should return the data type error message to second_keyword field", async () => {
            const res = await request(app).post("/findme").send({...OBJECT_TEST_API, second_keyword: 123});

            expect(res.error.text).toEqual('{"second_keyword":{"error":"Unexpected data type.","field_type":"<string>"}}');
        });
    });
    
    describe("Not sending the website_url field (empty field)", () => {
        it("should return the error message to email field", async () => {
            const res = await request(app).post("/findme").send({...OBJECT_TEST_API, website_url: ""});

            expect(res.error.text).toEqual('{"website_url":{"error":"You must define the website.","field_type":"<string>"}}');
        });
    });
})
