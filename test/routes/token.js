const { expect } = require("chai");

describe("Routes: Token", ()=>{
    const Users =  app.models.users;

    describe("POST /token", ()=>{
        beforeEach( async ()=>{
            await Users.destroy({where:{}});

            await Users.create({
                name: 'john',
                email: 'john@mail.com',
                password: '12345'
            })
        })

        describe("Status 200", ()=>{

            it("returns authenticated user token", done=>{
                request.post('/token').send({
                    email: 'john@mail.com',
                    password: '12345'
                }).expect(200).end((err, res)=>{
                    expect(res.body).to.include.keys('token');
                    done(err);
                })
            })
        })

        describe("Status 401", ()=>{

            it("throwa error when password is incorrect", done  => {
                request.post('/token').send({
                    email: 'john@mail.com',
                    password: 'SENHA_ERRADA'
                }).expect(401).end(done);
                })
            })

            it("throwa error when email not exits incorrect", done  => {
                request.post('/token').send({
                    email: 'EMAIL_ERRADO',
                    password: 'SENHA_ERRADA'
                }).expect(401).end(done);
            })

            it("throwa error when someone filds are blank", done  => {
                request.post('/token').expect(401).end(done);
            })
        })
})