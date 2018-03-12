import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    currentUser: null,
    personalMessages: null,
    isMakingNew: false,
    allUsers: null,
    currentReciever: null,

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
        
        myStore.queryRecord('user',{userName: auth.getName}).then(function (record){
            self.set('currentUser', record);
            user = record;
        });
        
        myStore.query('message', {sender: user}).then(function (records){
            self.set('personalMessages', records);
            console.log(records);
        });

        myStore.findAll('user').then(function (records){
            self.set('allUsers', records);
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
            this.set('currentReciever', rcv);
            console.log("Setting Reciever");
            console.log(rcv);
        }
    }

});
