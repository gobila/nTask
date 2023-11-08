const supertest = require('supertest');
const chai = require('chai');
const app = require('../index');
const config = require('../config');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.config = config;