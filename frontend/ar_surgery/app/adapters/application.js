import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://ec2-18-217-206-65.us-east-2.compute.amazonaws.com:3700'
});