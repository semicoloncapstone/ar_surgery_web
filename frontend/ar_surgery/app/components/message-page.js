import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    currentUser: null,
    Messages: null,
    messageBoardMessages: null,
    isMakingNew: false,
    allUsers: null,
    currentReciever: null,
    userArray: null,
    isSentMsgs: false,
    isRcvdMsgs: true,
    SM: "w3-black",
    RM: "w3-green",
    isZeroMsgs: false,
    regs: null,

    didRender() {
        this._super(...arguments);
        Ember.$('.ui.modal.auth')
        .modal({
            closable: false,
        })
        .modal('show');
    },

    init(){
        this._super(...arguments);
        var auth = this.get('oudaAuth');
        var self = this;
        var myStore = this.get('store');
        var user = null;
        var user2 = null;
        var users = [];
        
        myStore.queryRecord('user',{userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
            user = record.id;
            myStore.findAll('user').then(function (records){
                self.set('allUsers', records);
                myStore.query('message', {reciever: user}).then(function (records){
                    if (records.content.length === 0){
                        self.set('isZeroMsgs', true);
                    } else {
                        self.set('Messages', records);
                    }
                });
            });
        });

        myStore.queryRecord('user', {userName: auth.getName}).then(function (record){
            user2 = record.id;
            myStore.query('registration', {user: user2}).then(function (records){
                console.log(records);
                console.log(records.objectAt(0).data);
                self.set('regs', records);
            });
        });
    },

    actions: {
        openNewMessage(){
            this.set('isMakingNew', true);
        },

        sendMessage(){
            var self = this;
            var myStore = this.get('store');
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            var newMessage = myStore.createRecord('message', {
                sender: self.get('currentUser'),
                reciever: self.get('currentReciever'),
                messageBoard: null,
                date: months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
                header: self.get('header'), 
                body: self.get('body'),
                type: "Public"
            });
            //console.log(newClass);
            newMessage.save();

            this.set('isUserFormEditing', false);
            Ember.$('.ui.modal.auth').modal('hide');
            Ember.$('.ui.modal.auth').remove();
        },
        
        cancelSend(){
            this.set('isMakingNew', false);
            Ember.$('.ui.modal.auth').modal('hide');
            Ember.$('.ui.modal.auth').remove();
        },

        selectReciever(rcv){
            var self = this;
            var myStore = this.get('store');
            console.log(rcv);
            myStore.findRecord('user', rcv).then(function (record){
                self.set('currentReciever', record);
                console.log(self.get('currentReciever'));
            });
            //this.set('currentReciever', rcv);
            //console.log("Setting Reciever");
            //console.log(rcv);
        },

        recievedMsgs(){
            this.set('isZeroMsgs', false);
            this.set('isRcvdMsgs', true);
            this.set('isSentMsgs', false);

            this.set('SM', 'w3-black');
            this.set('RM', 'w3-green');

            var auth = this.get('oudaAuth');
            var self = this;
            var myStore = this.get('store');
            var user = null;
            
            myStore.queryRecord('user',{userName: auth.getName}).then(function (record){
                self.set('currentUser', record);
                user = record.id;
                myStore.findAll('user').then(function (records){
                    self.set('allUsers', records);
                    myStore.query('message', {reciever: user}).then(function (records){
                        
                        //console.log(records.content.length);
                        if (records.content.length === 0){
                            self.set('isZeroMsgs', true);
                        } else {
                            self.set('Messages', records);
                        }
                    });
                });
            });
        },

        sentMsgs(){
            this.set('isZeroMsgs', false);
            var myStore = this.get('store');
            var self = this;
            var user = null;
            
            this.set('isRcvdMsgs', false);
            this.set('isSentMsgs', true);

            this.set('SM', 'w3-green');
            this.set('RM', 'w3-black');

            var auth = this.get('oudaAuth');
            
            myStore.queryRecord('user',{userName: auth.getName}).then(function (record){
                self.set('currentUser', record);
                user = record.id;
                myStore.findAll('user').then(function (records){
                    self.set('allUsers', records);
                    myStore.query('message', {sender: user}).then(function (records){
                        if (records.content.length === 0){
                            self.set('isZeroMsgs', true);
                        } else {
                            self.set('Messages', records);
                        }
                    });
                });
            });
        },
    }

});
