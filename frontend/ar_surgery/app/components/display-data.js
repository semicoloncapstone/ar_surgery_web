import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    dataID: null,
    numberData: null,
    barOptions: null,
    myData: [],
    dataObject: null,
    duration: null,
    maxDistance: null,
    init(){
        this._super(...arguments);
        var self = this;
        this.get('store').findRecord('simulation', this.get('dataID')).then(function (simulation) {
            
            self.set('dataObject', simulation);
            /*console.log("Date");
            console.log(self.get('dataObject').get('date'));
            console.log("user");
            console.log(self.get('dataObject').get('user'));
            console.log("truePath");
            console.log(self.get('dataObject').get('truePath'));
            console.log("timeOut");
            console.log(self.get('dataObject').get('timeOut'));
            console.log("debugged");
            console.log(self.get('dataObject').get('debugged'));
            console.log("target.pos");
            console.log(self.get('dataObject').get('target').get('position'));
            console.log("toolpoints1.posx");
            console.log(self.get('dataObject').get('toolPoints').objectAt(0).get('position')[0]);*/
            console.log(self.get('dataObject').get('toolPoints').get('length'));
            var initialTime = self.get('dataObject').get('toolPoints').objectAt(0).get('time');
            var length = self.get('dataObject').get('toolPoints').get('length');
            var time;
            var distance;
            var x;
            var y;
            var z;
            var max =0;
            var myduration = self.get('dataObject').get('toolPoints').objectAt(length-1).get('time') - initialTime;
            self.set('duration', myduration);
            var endTime = myduration - myduration%1;
            console.log(endTime);
            for (var i =0; i<length; i++)
            {
                x = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[0];
                y = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[1];
                z = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[2];
                distance = Math.sqrt(x*x + y*y + z*z);
                if (distance>max)
                {
                    max = distance;
                    self.set('maxDistance', max);
                }
                time = self.get('dataObject').get('toolPoints').objectAt(i).get('time') - initialTime;
                self.get('myData').push({ x: time, y:distance});
            }
            
            self.set('numberData', {
                    
                    datasets: [
                        {
                            backgroundColor: "rgba(0,0,128,.9)",
                            
                            data: self.get('myData')
                        }
                    ]
                    
                });
        });
        self.set('barOptions', {
                pointRadius: 2,
                responsive: false,
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                title: {
                    display: true,
                    fontSize: 16,
                    fontStle:"bold",
                    fontColor:"#101",
                    text: 'Students per Assestment Code'
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Students',
                            
                        },
                        ticks: {
                                suggestedMin: 0,
                                suggestedMax: this.get('maxDistance')+2, 
                        }
                    }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Assesment Code'
                    },
                    ticks: {
                            suggestedMin: 0,
                            suggestedMax: this.get('duration') + 2,
                            
                        }
                    }]
                }
            });
        /*this.set('numberData', {
            datasets: [
                    {
                        data:   [{ x:10, y:20},
                                { x:9, y:25},
                                { x:2, y:18},
                                { x:17, y:12}]
                    }
                ]
            });*/
        
        
        

        
    },
    
    actions: {

    }
});
