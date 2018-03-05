import Ember from 'ember';

export default Ember.Component.extend({

    isUserFormEditing: false,


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
            var myStore = this.get('store');
            var newClass = myStore.createRecord('class', {
              className: this.get('className'),
              classSize: this.get('classSize'),
              program: this.get('program'),
              school: this.get('school'),
              teacher: this.get('instructor')
            });
            newClass.save();

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
