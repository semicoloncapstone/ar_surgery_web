import DS from 'ember-data';

export default DS.Model.extend({
    uName: DS.attr(),
    date: DS.attr(),
    simulaionDuration: DS.attr(),
});
