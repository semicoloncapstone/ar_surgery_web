import Ember from 'ember';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    username: null,
    userSimHeaders: null,
    noData: false,
    averageTimeDisplay: 0,

    init(){
        this._super(...arguments);
        var self = this;
        var myStore = this.get('store');
        var thisUser = this.get('userSt');
        var UN = null;
        //console.log(this.get('userSt'));

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
                    
                    for (var i = 0; i < records.content.length; i++){
                        timeSum += records.objectAt(i).get('simulaionDuration');
                        //console.log(records.objectAt(i).get('simulaionDuration'));
                    }
                    averageTime = timeSum / records.content.length;
                    self.set('averageTimeDisplay', averageTime);
                }
                
            });

        });
    },

    actions: {

    }

});
