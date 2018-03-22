import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    username: null,
    userSimHeaders: null,
    noData: false,
    averageTimeDisplay: 0,
    minTimeDisplay: 0,
    maxTimeDisplay: 60,

    init(){
        this._super(...arguments);
        var self = this;
        var myStore = this.get('store');
        var thisUser = this.get('userSt');
        var UN = null;
        //console.log(this.get('userSt'));

        //console.log(this.get('minTimeDisplay'));

        myStore.queryRecord('password', {user: thisUser.get('id')}).then(function(record){
            //console.log(record.get('userName'));
            self.set('username', record.get('userName'));
            UN = record.get('userName');
            myStore.query('simHeader', {uName: UN}).then(function (records){
                //console.log(records);
                self.set('userSimHeaders', records);
            });

        });

    },

    didRender(){
        this._super(...arguments);
        var self = this;
        var myStore = this.get('store');
        var thisUser = this.get('userSt');
        var UN = null;
        var timeSum = 0;
        var averageTime = 0;
        var minTime = 0;
        var maxTime = 0;
        //console.log(this.get('userSt'));

        myStore.queryRecord('password', {user: thisUser.get('id')}).then(function(record){
            //console.log(record.get('userName'));
            self.set('username', record.get('userName'));
            UN = record.get('userName');
            myStore.query('simHeader', {uName: UN}).then(function (records){
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
                    //console.log(this.get('minTimeDisplay'));
                }
                
            });

        });
    },

    actions: {

    }

});
