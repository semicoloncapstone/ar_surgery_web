import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    regModel: null,
    userModel: null,
    personalClasses: null,
    allClasses: null,
    currentUser: null,
    noClass: false,
    isAllClass: false,
    isMyClass: true,
    AC: "w3-black",
    MC: "w3-red",

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
        var auth = this.get('oudaAuth');
        var user = auth.getName;
        var userID = null;
        var myStore = this.get('store');
        
        myStore.queryRecord('user', {userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
            //console.log(record.id);
            userID = record.id;
            myStore.query('class', {user: userID}).then(function(records) {
                //console.log(self.get('currentUser'));
                if (records.content.length === 0){
                    self.set('noClass', true);
                } else {
                    self.set('personalClasses', records);
                }
                //console.log(records);
            })
        });

        /*myStore.findAll('registration').then(function (records) {
            self.set('regModel', records);
            //console.log(self.get('regModel').objectAt(0).get('user'));
        })*/
        //console.log(this.get('regModel'));
        myStore.findAll('class').then(function (records) {
            self.set('allClasses', records);
        });

        //console.log(this.get('classModel'));
        //console.log(teachID);
        //myStore.query('class', {})
        
    },
    

    actions: {
        allClass(){
            this.set('isAllClass', true);
            this.set('isMyClass', false);

            this.set('AC', 'w3-red');
            this.set('MC', 'w3-black');
            
        },

        myClass(){
            this.set('isAllClass', false);
            this.set('isMyClass', true);

            this.set('AC', 'w3-black');
            this.set('MC', 'w3-red');
        }
    }
});
