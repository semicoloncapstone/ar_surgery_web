import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    currentUser: null,
    personalMessages: null,

    init(){
        this._super(...arguments);
        var auth = this.get('oudaAuth');
        var self = this;
        var myStore = this.get('store');
        var user = null;
        
        myStore.queryRecord('user',{userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
            user = record;
        });
        
        myStore.query('message', {sender: user}).then(function (records){
            self.set('personalMessages', records);
            console.log(records);
        });

    },

    actions: {
        
    }

});
