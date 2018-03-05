import DS from 'ember-data';

export default DS.Model.extend({
    type: DS.attr(),
    capacity: DS.attr(),
    class: DS.belongsTo('class', {async: true}),
});

/*
type: String,
        capacity: Number,
        class: {type: mongoose.Schema.ObjectId, ref: ('Class')},
*/