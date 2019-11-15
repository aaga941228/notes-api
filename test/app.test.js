const { expect } = require("chai");
const mocha = require("mocha");
const app = require("../index");
const supertest = require("supertest");

describe("appointment app", function() {
  it("should return an obect with notes", function(done) {
    supertest(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedResponse = [
          {
            id: "_hbe8y5xke",
            title: "New note",
            note: "first note"
          }
        ];

        expect(res.body).to.be.deep.equal(expectedResponse);
        done();
      });
  });

  it("should add a new note and return its id when create a note", function(done) {
    supertest(app)
      .post("/")
      .send({
        title: "",
        note: ""
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedResponse = {
          id: "_hbe8y5xke"
        };

        expect(res.body).to.be.deep.equal(expectedResponse);
        done();
      });
  });

  it("should return an error when try to delete an inexistent note", function(done) {
    supertest(app)
      .delete("/g")
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedResponse = {
          response: "id invalid"
        };

        expect(res.body).to.be.deep.equal(expectedResponse);
        done();
      });
  });

  it("should delete a user", function(done) {
    supertest(app)
      .delete("/_hbe8y5xke")
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedResponse = {
          response: "deleted"
        };

        expect(res.body).to.be.deep.equal(expectedResponse);
        done();
      });
  });

  it("should return an error when pass an inexistent id", function(done) {
    supertest(app)
      .put("/345")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedResponse = {
          response: "id invalid"
        };
        expect(res.body).to.be.deep.equal(expectedResponse);
        done();
      });
  });

  it.only("should update a note", function(done) {
    supertest(app)
      .put("/_hbe8y5xke")
      .send({
        title: "",
        note: ""
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedResponse = {
          response: "updated"
        };
        expect(res.body).to.be.deep.equal(expectedResponse);
        done();
      });
  });
});
