const jwt = require('jwt-simple');

describe('Routes: Tasks', ()=>{

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
        })
        await Tasks.destroy({where:{}})
        const tasks = await Tasks.bulkCreate([
            {id:1, title: 'work', UserId: user.id},
            {id:2, title: 'Study', UserId: user.id}
        ])
        fakeTask=tasks[0]
        token = jwt.encode({id: user.id}, config.jwt.secret)
    })

    describe("GET /tasks",()=>{
        describe('stutus 200', ()=>{
            it('return a list of tasks', done=>{
                request.get('/tasks').set('Authorization', token)
                .expect(200).end((err, res)=>{
                    expect(res.body).to.have.length(2);
                    expect(res.body.title[0]).to.eql('work');
                    expect(res.body.title[1]).to.eql('Study');
                    done(err)
                })
            })
           
        })
    });

    describe("POST /tasks/",()=>{
        describe('stutus 200', ()=>{
            it('create a new tasks', done=>{
                request.post('/tasks').set('Authorization', token)
                .send({title: 'Run'}).expect(200)
                .end((err, res)=>{
                    expect(res.body.title).to.eql('Run');
                    expect(res.body.done).to.be.false;
                    done(err)
                })
            })
        })
    });

    describe("GET /tasks/:id",()=>{
        describe('stutus 200', ()=>{
            it('return one task', done=>{
                request.get(`/tasks/${fakeTask.id}`).set('Authorization', token)
                .expect(200).end((err, res)=>{
                    expect(res.body.title).to.eql('Work')
                    done(err)
                })
            })
        })
        describe('stutus 404', ()=>{
            it('throws error when task not exist', done=>{
                request.get('/tasks/0').set('Authorization', token)
                .expect(404).end(done)
            })
        })
    });

    describe("PUT /tasks/:id",()=>{
        describe('stutus 200', ()=>{
            it('update a task', done=>{
                request.put(`/tasks/${fakeTask.id}`).set('Authorization', token)
                .send({title:'Travel', done: true})
                .expect(204).end(done)
            })
        })
    })
    describe("DELETE /tasks/:id",()=>{
        describe('stutus 204', ()=>{
            it('remove a task', done=>{
                request.delete(`/tasks/${fakeTask.id}`).set('Authorization', token)
                .expect(204).end(done)
            })
        })
    })
})