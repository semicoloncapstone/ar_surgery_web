import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),

    init(){
        this._super(...arguments);
        var self = this;
        var myStore = this.get('store');
        var thisUser = this.get('userSt');

        myStore.query('password', {user: thisUser.id}).then(function(record){
            console.log(record);
        });

    },

    actions: {

    }

});
