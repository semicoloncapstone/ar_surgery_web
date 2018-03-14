import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    noData: false,
    averageTimeDisplay: 0,
    userSimHeaders: null,

    init(){
        this._super(...arguments);
        var self = this;
        var myStore = this.get('store');
        var thisUser = this.get('userSt');
        var auth = this.get('oudaAuth');
        var UN = null;
        var timeSum = 0;
        var averageTime = 0;
        //console.log(this.get('userSt'));

        
        myStore.query('simHeader', {uName: auth.getName}).then(function (records){
            console.log(records);
            if (records.content.length === 0){
                self.set('noData', true);
            } else {
                self.set('userSimHeaders', records);
                
                for (var i = 0; i < records.content.length; i++){
                    timeSum += records.objectAt(i).get('simulaionDuration');
                    //console.log(records.objectAt(i).get('simulaionDuration'));
                }
                averageTime = timeSum / records.content.length;
                self.set('averageTimeDisplay', averageTime);
            }
            
        });
    }

});
