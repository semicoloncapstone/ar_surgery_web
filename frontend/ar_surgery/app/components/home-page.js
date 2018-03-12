import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    username: "",
    currentUser: null,
    isHomePage: true, 
    isHistoryPage: false,
    isClassesPage: false,
    isMessagesPage: false,
    isSettingsPage: false,
    Ho: "w3-purple",
    Hi: "",
    C: "",
    M: "",
    S: "",

    init() {
        this._super(...arguments);
        var auth = this.get('oudaAuth');
        var self = this;
        this.set('username', auth.getName);
        //this.set('currentUser', self.get('store').queryRecord('user',{userName: auth.getName}));
        if (auth.getName === "Root"){
            
        } else {
            this.get('store').queryRecord('user',{userName: auth.getName}).then(function (record){
                self.set('currentUser', record);
                //console.log(record);
            });
        }
        Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', function(err, rows){
            function unpack(rows, key) {
                return rows.map(function(row)
                { return row[key]; });}

            var trace1 = {
                x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
                mode: 'markers',
                marker: {
                    size: 12,
                    line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5},
                    opacity: 0.8},
                type: 'scatter3d'
            };

            var trace2 = {
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

            var data = [trace1, trace2];
            var layout = {margin: {
                l: 100,
                r: 100,
                b: 100,
                t: 100
            }};
            //console.log(data);
            Plotly.newPlot('tester', data, layout);
        });
        //this.set('username', this.get('currentUser').firstName + " " + this.get('currentUser').lastName);
    },

    actions: {
    
        HomePress () {
            this.set('isHomePage', true);
            this.set('Ho', "w3-purple");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
        },
        HistoryPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', true);
            this.set('Hi', "w3-blue");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
        },
        ClassPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', true);
            this.set('C', "w3-red");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', false);
            this.set('S', "");
        },
        MessagePress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', true);
            this.set('M', "w3-green");
            this.set('isSettingsPage', false);
            this.set('S', "");
        },
        SettingsPress() {
            this.set('isHomePage', false);
            this.set('Ho', "");
            this.set('isHistoryPage', false);
            this.set('Hi', "");
            this.set('isClassesPage', false);
            this.set('C', "");
            this.set('isMessagesPage', false);
            this.set('M', "");
            this.set('isSettingsPage', true);
            this.set('S', "w3-orange");
            console.log(this.get('oudaAuth').get('isAuthenticated'));
            //this.get('routing').transitionTo('add-user');
        },
        smallMenuClick(){
            
        },

    }
    
});
