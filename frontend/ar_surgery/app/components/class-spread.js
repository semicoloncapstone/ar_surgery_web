import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    TCLADDIsPermitted: false,
    isOwningTeacher: false,
    currentUser: null,
    notHaveMessageBoard: true,
    thisMessageBoard: null,
    isZeroMsgs: false,
    Messages: null,
    isMakingNew: false,
    showMsgBrd: false,
    showClassInfo: true,
    showClassUsers: false,
    A: "w3-red",
    B: "w3-black",
    C: "w3-black",   
    classRegs: null,
    noRegs: false, 

    init(){
        this._super(...arguments);
        var myStore = this.get('store');
        var self = this;
        var thisClass = this.get('cls');
        var auth = this.get('oudaAuth');
        
        myStore.queryRecord('user', {userName: auth.getName}).then(function(record){
            self.set('currentUser', record);
        });

        myStore.queryRecord('messageBoard', {class: thisClass.id}).then(function(record){
            if (record === null){
                self.set('notHaveMessageBoard', true);
            } else {
                self.set('notHaveMessageBoard', false);
                self.set('thisMessageBoard', record);
                //console.log(record);
                myStore.query('message', {messageBoard: record.id}).then(function (records){
                    if (records.content.length === 0){
                        self.set('isZeroMsgs', true);
                        //console.log('no messages');
                    } else {
                        self.set('Messages', records);
                        //console.log(records);
                    }
                });
            }
        });

        myStore.query('registration', {class: thisClass.id}).then(function(records){
            console.log(records);
            if (records === null){
                self.set('noRegs', true);
            } else {
                self.set('classRegs', records);
                //console.log(records);
            }
        });
        
    },

    didRender() {
        this._super(...arguments);
        Ember.$('.ui.modal.auth')
        .modal({
            closable: false,
        })
        .modal('show');
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
        establishMsgBoard(cls){
            //createRecord --> messageBoard
            var myStore = this.get('store');
            var self = this;
            var newBoard = myStore.createRecord('messageBoard', {
                type: "Public",
                capacity: 200,
                class: cls
            });
            
            newBoard.save();

            this.set('notHaveMessageBoard', false);
            var thisClass = this.get('cls');

            myStore.queryRecord('messageBoard', {class: thisClass.id}).then(function(record){
                myStore.query('message', {messageBoard: record.id}).then(function (records){
                    if (records.content.length === 0){
                        self.set('isZeroMsgs', true);
                        //console.log('no messages');
                    } else {
                        self.set('Messages', records);
                        //console.log(records);
                    }
                });
            });
            
            
        },
        
        openNewMessage(){
            this.set('isMakingNew', true);
        },

        sendMessage(){
            var self = this;
            var myStore = this.get('store');
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var thisBoard = this.get('thisMessageBoard');

            var newMessage = myStore.createRecord('message', {
                sender: self.get('currentUser'),
                reciever: null,
                messageBoard: thisBoard,
                date: months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
                header: self.get('header'), 
                body: self.get('body'),
                type: "Board"
            });
            //console.log(newClass);
            newMessage.save();

            var thisClass = this.get('cls');

            myStore.queryRecord('messageBoard', {class: thisClass.id}).then(function(record){
                myStore.query('message', {messageBoard: record.id}).then(function (records){
                    console.log(records);
                    self.set('Messages', records);
                     
                });
            });

            this.set('isUserFormEditing', false);
            Ember.$('.ui.modal.auth').modal('hide');
            Ember.$('.ui.modal.auth').remove();
        },
        
        cancelSend(){
            this.set('isMakingNew', false);
            Ember.$('.ui.modal.auth').modal('hide');
            Ember.$('.ui.modal.auth').remove();
        },

        showInfo(){
            this.set('showClassInfo', true);
            this.set('showMsgBrd', false);
            this.set('showClassUsers', false);

            this.set('A', 'w3-red');
            this.set('B', 'w3-black');
            this.set('C', 'w3-black');
        },

        showBrd(){
            this.set('showClassInfo', false);
            this.set('showMsgBrd', true);
            this.set('showClassUsers', false);

            this.set('A', 'w3-black');
            this.set('B', 'w3-red');
            this.set('C', 'w3-black');
        },

        showUsers(){
            this.set('showClassInfo', false);
            this.set('showMsgBrd', false);
            this.set('showClassUsers', true);

            this.set('A', 'w3-black');
            this.set('B', 'w3-black');
            this.set('C', 'w3-red');
        },

        removeMember(regID){
            console.log(regID);
            var myStore = this.get('store');
            if (confirm ('Are you sure you need to drop this class registration?')) {
                myStore.find('registration', regID).then(function(reg) {
                    console.log(reg);
                    reg.destroyRecord();
                });
            }
        }
    }
});
