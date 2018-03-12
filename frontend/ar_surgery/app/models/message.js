import DS from 'ember-data';

export default DS.Model.extend({
    sender: DS.belongsTo('user', {async: true}),
    reciever: DS.belongsTo('user', {async: true}),
    messageBoard: DS.belongsTo('messageBoard', {async: true}),
    date: DS.attr(),
    header: DS.attr(),
    body: DS.attr(),
    type: DS.attr(),
});

/**
 * 
 * sender: {type: mongoose.Schema.ObjectId, ref: ('Users')},
        reciever: {type: mongoose.Schema.ObjectId, ref: ('Users')},
        messageBoard: {type: mongoose.Schema.ObjectId, ref: ('MessageBoards')},
        date: String,
        header: String,
        body: String,
        type: String,
 */