import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    classesModel: null,
    regModel: null,
    userModel: null,

    init(){
        this._super(...arguments);
        var self = this;

        this.get('store').findAll('registration').then(function (records) {
            self.set('regModel', records);
        });
        this.get('store').findAll('class').then(function (records) {
            self.set('classesModel', records);
        });
        
        
        //console.log(this.get('classesModel'));
    },

    actions: {
        
    }
});
