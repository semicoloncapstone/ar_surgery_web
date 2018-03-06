import DS from 'ember-data';

export default DS.Model.extend({
    date: DS.attr(),
    duration: DS.attr(),
    type: DS.attr(),
    class: DS.belongsTo('class', {async: true}),
    user: DS.belongsTo('user', {async: true}),
});

/*
date: String,
        duration: Number,
        type: String,
        class: {type: mongoose.Schema.ObjectId, ref: ('Class')},
        user: {type: mongoose.Schema.ObjectId, ref: ('Users')},
*/