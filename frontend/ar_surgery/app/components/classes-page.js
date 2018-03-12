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
        var myStore = this.get('store');
        
        myStore.queryRecord('user', {userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
            console.log(record.id);
            userID = record.id;
            
        }).then(myStore.query('class', {user: userID}).then(function(records) {
            console.log(self.get('currentUser'));
            self.set('personalClasses', records);
            console.log(records);
        }));

        myStore.findAll('registration').then(function (records) {
            self.set('regModel', records);
            //console.log(self.get('regModel').objectAt(0).get('user'));
        });
        //console.log(this.get('regModel'));
        /*myStore.findAll('class').then(function (records) {
            self.set('classModel', records);
            teachID = records;
        });*/

        //console.log(this.get('classModel'));
        //console.log(teachID);
        //myStore.query('class', {})
        
    },
    

    actions: {

    }
});
