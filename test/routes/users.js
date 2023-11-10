const jwt = require('jwt-simple');

describe('Routes: Users', ()=>{

    const  Users = app.models.users
    const  Tasks = app.models.tasks

    let token;
    let fakeTask

    beforeEach(async ()=>{
        await Users.destroy({where:{}})
        const user = await Users.create({
            name: 'John',
            email: 'john@mail.com',
            password: '12345'
        });
        token = jwt.encode({id: user.id}, config.jwt.secret)
    })

    describe("GET /user",()=>{
        describe('stutus 200', ()=>{
            it('return a authenticated user', done=>{
                request.get('/user').set('Authorization', token)
                .expect(200).end((err, res)=>{
                    expect(res.body.name).to.eql('John');
                    expect(res.body.email).to.eql('john@mail.com');
                    done(err)
                })
            })
           
        })
    });
    describe("DELETE /user",()=>{
        describe('stutus 204', ()=>{
            it('delets a authenticated user', done=>{
                request.delete(`/user`).set('Authorization', token)
                .expect(204).end(done)
            })
        })
    })

    describe("POST /user ",()=>{
        describe('stutus 200', ()=>{
            it('create a new user', done=>{
                request.post('/users').set('Authorization', token)
                .send({
                    name: 'Maria',
                    email: 'maria@mail.com',
                    password: '54321'
                }).expect(200)
                .end((err, res)=>{
                    expect(res.body.name).to.eql('Maria');
                    expect(res.body.email).to.eql('maria@mail.com');
                    done(err)
                })
            })
        })
    });

})