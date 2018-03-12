import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    isUserFormEditing: false,
    username: "",
    currentUser: null,

    init() {
        var self = this;
        this._super(...arguments);
        var auth = this.get('oudaAuth');
        this.set('username', auth.getName);
        
        //console.log(auth.getName);
        //console.log(this.get('store').queryRecord('user',{userName: auth.getName}));
        
        if (auth.getName === "Root"){
            
        } else {
            this.get('store').queryRecord('user',{userName: auth.getName}).then(function (record){
                self.set('currentUser', record);
                //console.log(record);
            });
        }
      
        //console.log(this.get('currentUser'));
    },

    didRender() {
        this._super(...arguments);
        Ember.$('.ui.modal.auth')
          .modal({
            closable: false,
            
          })
          .modal('show');
      },

    actions: {
        save () {
            var self = this;
            var myStore = this.get('store');
            var d = new Date();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            var newClass = myStore.createRecord('class', {
              className: this.get('className'),
              classSize: this.get('classSize'),
              program: this.get('program'),
              school: this.get('school'),
              teacher: this.get('currentUser')
            });
            //console.log(newClass);
            newClass.save();

            /*var newReg = myStore.createRecord('registration', {
                date: months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
                duration: 6,
                type: "Public",
                class: newClass,
                user: this.get('currentUser')
            });

            newReg.save()*/

            this.set('isUserFormEditing', false);
            Ember.$('.ui.modal.auth').modal('hide');
            Ember.$('.ui.modal.auth').remove();
          },

        addNewClass(){
            this.set('className', "");
            this.set('classSize', "");
            this.set('program', "");
            this.set('school', "");
            this.set('instructor', "");
            this.set('isUserFormEditing', true);
          },
      
          cancel () {
            this.set('isUserFormEditing', false);
            Ember.$('.ui.modal.auth').modal('hide');
            Ember.$('.ui.modal.auth').remove();
      
          }
        
    }

});
