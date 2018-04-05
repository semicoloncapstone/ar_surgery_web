import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    allUsers: null,
    currentUser: null,
    displayMessages: [],
    messageNotViewing: true,
    zeroMsgs: false,
    scrollHeight: 0,
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
        
    
    },

    keyPress: function (e) {
        if (e.which === 13){
            e.preventDefault();
            $('#send').click();
        }
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
                        self.set('scrollHeight', $('#messageCon').prop('scrollHeight'));
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
            //$("#messageCon").scrollTop($('#messageCon').prop('scrollHeight'));
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
                var mins = '';
                var hours = '';
                if (d.getHours() === 0){
                    hours = 12;
                    if (d.getMinutes()<10){
                        mins = "0" + d.getMinutes() + ' AM';    
                    } else {
                        mins = d.getMinutes() + ' AM';
                    }
                } else if (d.getHours() > 12){
                    hours = d.getHours() - 12;
                    if (d.getMinutes()<10){
                        mins = "0" + d.getMinutes() + ' PM';    
                    } else {
                        mins = d.getMinutes() + ' PM';
                    }
                } else {
                    hours = d.getHours();
                    if (d.getMinutes()<10){
                        mins = "0" + d.getMinutes() + ' AM';    
                    } else {
                        mins = d.getMinutes() + ' AM';
                    }
                }
                newDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + hours + ":" + mins;
                
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
                self.set('body', '');  
            }
        }
    }


});
