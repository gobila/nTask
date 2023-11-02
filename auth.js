const passport = requiere('passport');
const {Strategy,  ExtractJwt} = require('passport-jwt');
const config = require('./config');

module.exports = (app)=>{
    const users = app.models.users;
    const {jwt} = config;

    const params = {
        secretOrKey: jwt.secret,
        jwtFromRequest:ExtractJwt.fromHeader('Authorization')
    };

    passport.use(
        new Strategy(params, async(payload, done)=>{
            try {
                const {id} = payload;
                const attributes = [ 'id', 'email'];
                const options ={attributes};
                const user = await users.findByPK(id, options);
                done(null, user)
            } catch (err) {
                done(null, err)
            }
        }));

        return {
            initialize: ()=> passport.initialize(),
            authenticate: ()=> passport.authenticate('jwt', jwt.options)
        }
}