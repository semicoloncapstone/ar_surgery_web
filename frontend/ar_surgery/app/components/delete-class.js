import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    
    actions: {
        deleteOneClass: function(id){
            var myStore = this.get('store');
            if (confirm ('Are you sure you need to delete this class?')) {

                myStore.find('class', id).then(function(theClass) {
                    theClass.destroyRecord();
                });
            }
        },
    }
});
