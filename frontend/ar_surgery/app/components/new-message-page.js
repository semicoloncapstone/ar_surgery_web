import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    allUsers: null,
    currentUser: null,
    displayMessages: null,

    init(){
        this._super(...arguments);
        var myStore = this.get('store');
        var auth = this.get('oudaAuth');
        var self = this;

        myStore.queryRecord('user', {userName: auth.getName}).then(function(rec){
            console.log(rec);
            self.set('currentUser', rec);
        });

        myStore.findAll('user').then(function(records){
            self.set('allUsers', records);
        });

    },

    actions: {
        openMessage(user){
            var myStore = this.get('store');
            var auth = this.get('oudaAuth');
            var self = this;
            
            self.set('currentReciever', user);
            myStore.query('message', {sender: self.get('currentUser').get('id'), reciever: user.get('id')}).then(function(messages){
                //console.log(messages);
                self.set('displayMessages', messages);
            });
        },

        sendMessage(){
            var self = this;
            var myStore = this.get('store');
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            if(self.get('body') === ''){
                alert('No message entered!');
            } else {
                var newMessage = myStore.createRecord('message', {
                    sender: self.get('currentUser'),
                    reciever: self.get('currentReciever'),
                    messageBoard: null,
                    date: months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(),
                    header: null, 
                    body: self.get('body'),
                    type: "Public"
                });
                //console.log(newClass);
                newMessage.save().then(myStore.query('message', {sender: self.get('currentUser').get('id'), reciever: self.get('currentReciever').get('id')}).then(function(messages){
                    //console.log(messages);
                    self.set('displayMessages', messages);
                    })
                );
                
            }
        }
    }


});
