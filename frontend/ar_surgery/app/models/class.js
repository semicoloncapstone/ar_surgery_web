import DS from 'ember-data';

export default DS.Model.extend({
    className: DS.attr(),
    classSize: DS.attr(),
    program: DS.attr(),
    programDesc: DS.attr(),
    school: DS.attr(),
    schoolDesc: DS.attr(),
    teacher: DS.belongsTo('user',{ async: true }),
});

/*
className: String,
        classSize: Number,
        program: String,
        school: String,
        teacher: {type: mongoose.Schema.ObjectId, ref: ('Users')},
*/