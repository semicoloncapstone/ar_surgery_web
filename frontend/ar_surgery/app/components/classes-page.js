import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    classModel: null,
    regModel: null,
    userModel: null,
    personalClasses: null,
    currentUser: null,

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
        var auth = this.get('oudaAuth');
        var user = auth.getName;
        var userID = null;
        //console.log(user);
        this.get('store').findAll('registration').then(function (records) {
            self.set('regModel', records);
            //console.log(self.get('regModel').objectAt(0).get('user'));
        });
        //console.log(this.get('regModel'));
        this.get('store').findAll('class').then(function (records) {
            self.set('classModel', records);
            teachID = records;
        });

        this.get('store').queryRecord('user', {userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
            userID = record;
            //console.log(record.id);
            
        });
        //console.log(this.get('classModel'));
        //console.log(teachID);
        //this.get('store').query('class', {})
        this.get('store').query('class', {
            filter: {
              user: this.get('currentUser')
            }
        }).then(function(records) {
            console.log(self.get('currentUser'));
            self.set('personalClasses', records);
            console.log(records);
        });
    },
    

    actions: {

    }
});
