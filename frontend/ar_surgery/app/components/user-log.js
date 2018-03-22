import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    noData: false,
    averageTimeDisplay: 0,
    userSimHeaders: null,
    minTimeDisplay: 0,
    maxTimeDisplay: 60,

    init(){
        this._super(...arguments);
        var self = this;
        var myStore = this.get('store');
        var thisUser = this.get('userSt');
        var auth = this.get('oudaAuth');
        var UN = null;
        var timeSum = 0;
        var averageTime = 0;
        var minTime = 0;
        var maxTime = 0;
        //console.log(this.get('userSt'));

        
        myStore.query('simHeader', {uName: auth.getName}).then(function (records){
            //console.log(records);
            if (records.content.length === 0){
                self.set('noData', true);
            } else {
                self.set('userSimHeaders', records);
                minTime = records.objectAt(0).get('simulaionDuration');
                maxTime = records.objectAt(0).get('simulaionDuration');
                for (var i = 0; i < records.content.length; i++){
                    timeSum += records.objectAt(i).get('simulaionDuration');
                    //console.log(records.objectAt(i).get('simulaionDuration'));
                    if (records.objectAt(i).get('simulaionDuration') < minTime){
                        minTime = records.objectAt(i).get('simulaionDuration');
                    }
                    if (records.objectAt(i).get('simulaionDuration') > maxTime){
                        maxTime = records.objectAt(i).get('simulaionDuration');
                    }
                }
                averageTime = timeSum / records.content.length;
                self.set('averageTimeDisplay', averageTime);
                self.set('minTimeDisplay', minTime);
                self.set('maxTimeDisplay', maxTime);
            }
            
        });
    }

});
