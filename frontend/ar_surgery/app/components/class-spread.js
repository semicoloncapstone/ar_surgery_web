import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    TCLADDIsPermitted: false,
    isOwningTeacher: false,
    currentUser: null,
    boolTest: false,

    init(){
        this._super(...arguments);
        var myStore = this.get('store');
        var self = this;
        var thisClass = this.get('cls');
        console.log(thisClass);
        myStore.queryRecord('messageBoard', {class: thisClass}).then(function(record){
            console.log(record);
        });
        
    },

    TCLADDIsPermitted: Ember.computed(function(){
        var authentication = this.get('oudaAuth');
        if (authentication.getName === "Root") {
          return true;
        } else {
          return (authentication.get('userCList').indexOf("TCLADD") >= 0);
        }
    }),

    isOwningTeacher: Ember.computed(function(){
        var myStore = this.get('store');
        var self = this;
        var auth = this.get('oudaAuth');
        //this.set('name', this.get('cls'));
        //console.log(this.get('cls').get('teacher'));

        myStore.queryRecord('user', {userName: auth.getName}).then(function(record){
            //console.log(record);
            //console.log(self.get('cls').get('teacher').get('content'));
            if (self.get('cls').get('teacher').get('content') === record){
                self.set('isOwningTeacher', true);
            } else {
                self.set('isOwningTeacher', false);
                //console.log('is NOT the teacher');
            }

        }); 
    }),

    actions: {
        establishMsgBoard(){
            //createRecord --> messageBoard
        },
    }
});
