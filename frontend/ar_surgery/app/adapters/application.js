import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://ec2-18-217-102-250.us-east-2.compute.amazonaws.com:443'
    //host: 'http://localhost:3700'
});