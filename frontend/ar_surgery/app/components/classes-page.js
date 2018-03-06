import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    classModel: null,
    regModel: null,
    userModel: null,

    TCLADDIsPermitted: Ember.computed(function(){
        var authentication = this.get('oudaAuth');
        if (authentication.getName === "Root") {
          return true;
        } else {
          return (authentication.get('userCList').indexOf("TCLADD") >= 0);
        }
    }),

    TCLDELIsPermitted: Ember.computed(function(){
        var authentication = this.get('oudaAuth');
        if (authentication.getName === "Root") {
          return true;
        } else {
          return (authentication.get('userCList').indexOf("TCLDEL") >= 0);
        }
    }),

    init(){
        this._super(...arguments);
        var self = this;
        var teachID = null;
        this.get('store').findAll('registration').then(function (records) {
            self.set('regModel', records);
        });
        console.log(this.get('regModel'));
        this.get('store').findAll('class').then(function (records) {
            self.set('classModel', records);
            teachID = records;
            console.log(teachID);
        });
        console.log(this.get('classModel'));
        
        
        //console.log(this.get('classesModel'));
    },

    actions: {

    }
});
