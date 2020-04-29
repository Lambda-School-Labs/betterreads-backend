const request = require("supertest");

const server = require("../api/server");
const getToken = require("./getToken");

describe("user-books-on-a-shelf-router.js", () => {
    
    describe("POST to /api/booksonshelf/shelves/:shelfId", () => {
        it("returns 201 created and the added book", async () => {
            const response = await request(server).post("/api/booksonshelf/shelves/20")
                .set({ authorization: await getToken() })
                .send({ "book":  
                {
                    "id": 2,
                    "googleId": "-12.4797",
                    "title": "Computer",
                    "authors": "Gabrielle",
                    "publisher": "Auer, Spinka and Hammes",
                    "publishedDate": "1919",
                    "description": "Non minima iste tempora fugiat impedit minus. Unde recusandae ut natus aliquam ab laboriosam vel.",
                    "isbn10": "21.167.47.167",
                    "isbn13": "17.82.125.227",
                    "pageCount": 25415,
                    "categories": "Developer",
                    "thumbnail": "http://lorempixel.com/640/480",
                    "smallThumbnail": "http://lorempixel.com/640/480",
                    "language": "english",
                    "webReaderLink": "https://raquel.info",
                    "textSnippet": "Corrupti qui magnam culpa.\nMinima beatae alias ipsam consequatur quaerat magni officiis ea ut.\nTempora quo est ratione fuga voluptas officiis numquam.\nMollitia id est reiciendis similique molestiae.\nNon quibusdam esse voluptas consequatur et nesciunt.",
                    "isEbook": false,
                    "averageRating": "3.00"
                  },
                    "readingStatus": 0,
                    "favorite": false,
                    "userRating": "3.50"
                });
            
            expect(response.status).toBe(201);
            expect(response.body["book"]["bookId"]).toBe(2);
        });
        
        describe("PUT to /api/booksonshelf/shelves/:shelfId", () => {
            it("returns 200 ok and an updated shelf ID", async () => {
                const response = await request(server).put("/api/booksonshelf/shelves/20")
                .set({ authorization: await getToken() })
                .send({ "bookId": 3, "newShelfId": 1 })
                
                expect(response.status).toBe(200);
                expect(response.body["message"]).toBe("book moved to new shelf");
                expect(response.body["newShelfId"]).toBe(1) 
                const res = await request(server).put("/api/booksonshelf/shelves/1")
                    .set({ authorization: await getToken() })
                    .send({ "bookId": 3, "newShelfId": 20 })
                expect(res.status).toBe(200);
                expect(res.body["message"]).toBe("book moved to new shelf");
                expect(res.body["newShelfId"]).toBe(20)   
            });
        });
        
        describe("GET to /api/booksonshelf/shelves/:shelfId", () => {
            it("returns 200 ok and a shelf and all books on it", async () => {
                const response = await request(server).get("/api/booksonshelf/shelves/20/")
                    .set({ authorization: await getToken() });
                    
                expect(response.status).toBe(200);
                expect(response.body).not.toBe(undefined);
                expect(response.body).not.toHaveLength(0);
            });
        });
        
        describe("GET to /api/booksonshelf/user/:userId/shelves/allbooks", () => {
            it("returns 200 ok and a list of shelves with books on them", async () => {
                const response = await request(server).get("/api/booksonshelf/user/20/shelves/allbooks")
                    .set({ authorization: await getToken() });
                    
                expect(response.status).toBe(200);
                expect(response.body).not.toBe(undefined);
            });
        });
        
        describe("DELETE to /api/booksonshelf/shelves/:shelfId/:bookId", () => {
            it("returns 200 ok and a message", async () => {
                const response = await request(server).delete("/api/booksonshelf/shelves/20/2")
                    .set({ authorization: await getToken() })
                    
                expect(response.status).toBe(200);
                expect(response.body["message"]).toBe("book removed from shelf")  
            });
        });
    });
});