import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    allUsers: null,
    currentUser: null,
    displayMessages: [],
    messageNotViewing: true,
    zeroMsgs: false,
    poll: Ember.inject.service(),
    willDestroyElement() {
        this.get('poll').stopAll();
        this.get('poll').clearAll();
    },
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
        
        //console.log($('#messageCon'));
        //$("#mydiv").scrollTop($("#mydiv").scrollHeight);
    
    },

    actions: {
        openMessage(user){
            var myStore = this.get('store');
            var auth = this.get('oudaAuth');
            var self = this;
            
            self.set('currentReciever', user);
            myStore.query('message', {sender: self.get('currentUser').get('id'), reciever: user.get('id')}).then(function(messages){
                //console.log(messages);
                self.set('messageNotViewing', false);
                if (messages.content.length === 0){
                    self.set('zeroMsgs', true);
                    self.set('displayMessages', []);
                } else {
                    self.set('zeroMsgs', false);
                    self.set('displayMessages', messages.toArray());
                }
                self.get('poll').stopAll();
                self.get('poll').clearAll();
                self.get('poll').addPoll({
                        interval: 3000,
                        label: 'my-poll',
                        callback: () => {
                            myStore.query('message', {sender: self.get('currentUser').get('id'), reciever: user.get('id')}).then(function(messages){
                                self.set('messageNotViewing', false);
                                if (messages.content.length === 0){
                                    self.set('zeroMsgs', true);
                                    self.set('displayMessages', []);
                                } else {
                                    self.set('zeroMsgs', false);
                                    self.set('displayMessages', messages.toArray());
                                }
                            });
                        }
                }); 
            });
        },

        sendMessage(){
            var self = this;
            var myStore = this.get('store');
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            if(self.get('body') === ''){
                alert('No message entered! Please type a message to send.');
            } else {
                var newDate = '';
                if (d.getMinutes()<10){
                    newDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":0" + d.getMinutes()
                } else {
                    newDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
                }
                var newMessage = myStore.createRecord('message', {
                    sender: self.get('currentUser'),
                    reciever: self.get('currentReciever'),
                    messageBoard: null,
                    date: newDate,
                    header: null, 
                    body: self.get('body'),
                    type: "Public"
                });
                //console.log(newClass);
                newMessage.save();
                self.get('displayMessages').pushObject(newMessage);
                /*myStore.query('message', {sender: self.get('currentUser').get('id'), reciever: user.get('id')}).then(function(messages){
                    //console.log(messages);
                    self.set('messageNotViewing', false);
                    if (messages.content.length === 0){
                        self.set('zeroMsgs', true);
                    } else {
                        self.set('zeroMsgs', false);
                        self.set('displayMessages', messages);
                        console.log(messages);
                    }
                    
                });*/
                self.set('body', '');
                
            }
        }
    }


});
