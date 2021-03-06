import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    dataID: null,
    usersSims: null,
    isChosen: false,
    hasSims: true,
    
    init(){
        this._super(...arguments);
        
        //pull all sims for the given user

        var auth = this.get('oudaAuth');
        var myStore = this.get('store');
        var self = this;

        myStore.query('simulation', {user: auth.getName}).then(function(sims){
            self.set('usersSims', sims);
            
            if (sims.content.length>0){
                self.set('dataID', sims.objectAt(0).id);
                //console.log('dataID', sims.objectAt(0).id);
                self.set('isChosen', true);
                self.set('hasSims', true);   
            } else {
                self.set('hasSims', false);
            }
        });

        /*Plotly.d3.csv("http://localhost:3700/ventricles.csv", function(err, rows){
            console.log(rows);
            function unpack(rows, key) {
                return rows.map(function(row)
                { return row[key]; });}

            var trace1 = {
                x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
                mode: 'markers',
                /*marker: {
                    size: 12,
                    line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5},
                    opacity: 0.8},
                type: 'scatter3d',
            };

            /*var trace2 = {
                x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
                mode: 'markers',
                marker: {
                    color: 'rgb(127, 127, 127)',
                    size: 12,
                    symbol: 'circle',
                    line: {
                    color: 'rgb(204, 204, 204)',
                    width: 1},
                    opacity: 0.8},
                type: 'scatter3d'};

            var data = [trace1];
            var layout = {margin: {
                l: 1000,
                r: 1000,
                b: 1000,
                t: 1000
            }};
            console.log(data);
            Plotly.newPlot('tester', data, layout);
        });*/
    },
    
    actions: {
        setSimID(id){
            this.set('isChosen', false);
            this.set('dataID', id);
            var self = this;
            //console.log(id);
            //console.log(this.get('dataID'));
            Ember.run.next(function () {
                self.set('isChosen', true);
            });
        },
    }
});
