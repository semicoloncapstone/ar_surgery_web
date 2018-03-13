import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    

    actions: {
        register(cls){
            var self = this;
            var myStore = this.get('store');
            var auth = this.get('oudaAuth');
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var thisClass = null;

            console.log(cls);

            if (confirm("Are you sure you would like to register for this class?")){
                myStore.queryRecord('user', {userName: auth.getName}).then(function (record){
                    var newReg = myStore.createRecord('registration', {
                        date: months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
                        duration: 6,
                        type: "Public",
                        class: cls,
                        user: record
                    });
                    newReg.save()   
                });
            }
        }
    }


});
