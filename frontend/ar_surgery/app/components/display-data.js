import Ember from 'ember';
/*
TODO, check for qs,
get target pos, multiply it by our factor of 3.88, get relative position from origin
target position-> get target pos ^, +3.88*point
*/
export default Ember.Component.extend({
    store: Ember.inject.service(),
    dataID: null,
    numberData: null,
    barOptions: null,
    myData: [],
    dataObject: null,
    duration: null,
    maxDistance: null,
    origin: {x:-2.858, y: -10.2024, z: 15.1032},
    scaleFactor: 3.88,
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
            var myx = [];
            var myy = [];
            var myz = [];
            var myxIn = [];
            var myyIn = [];
            var myzIn = [];
            var target = {x: 0, y:0, z:0};
            target.x = self.get('origin').x + self.get('dataObject').get('target').get('position')[0]*self.get('scaleFactor');
            target.y = self.get('origin').y + self.get('dataObject').get('target').get('position')[2]*self.get('scaleFactor');
            target.z = self.get('origin').z + self.get('dataObject').get('target').get('position')[1]*self.get('scaleFactor');
            for (var i =0; i<length; i++)
            {
                x = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[0];
                y = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[1];
                z = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[2];
                /*myx.push(target.x + x*self.get('scaleFactor'));
                myy.push(target.y + z*self.get('scaleFactor'));
                myz.push(target.z + y*self.get('scaleFactor'));*/
                if (self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull'))
                {
                    myxIn.push(x*self.get('scaleFactor'));
                    myyIn.push(y*self.get('scaleFactor'));
                    myzIn.push(z*self.get('scaleFactor'));
                }
                else {
                    myx.push(x*self.get('scaleFactor'));
                    myy.push(y*self.get('scaleFactor'));
                    myz.push(z*self.get('scaleFactor'));
                }
                
                distance = Math.sqrt(x*x + y*y + z*z);
                if (distance>max)
                {
                    max = distance;
                    self.set('maxDistance', max);
                }
                time = self.get('dataObject').get('toolPoints').objectAt(i).get('time') - initialTime;
                self.get('myData').push({ x: time, y:distance});
            }
            console.log(myx);
            
            self.set('numberData', {
                    
                    datasets: [
                        {
                            backgroundColor: "rgba(0,0,128,.9)",
                            
                            data: self.get('myData')
                        }
                    ]
                    
                });
            Plotly.d3.csv('http://localhost:3700/brain.csv', function(err, rows){
                function unpack(rows, key) {
                    return rows.map(function(row)
                    { return row[key]; });}

                var trace0 = {
                    x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
                    mode: 'markers',
                    marker: {
                        color: 'rgba(0, 0, 255)',
                        size: 6,
                        line: {
                            color: 'rgba(0, 0, 0)',
                            width: 0.5
                        },
                        opacity: .1
                    },
                        
                    type: 'scatter3d'
                };

                var trace1 = {
                    x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
                    mode: 'markers',
                    marker: {
                        color: 'rgba(0, 0, 0)',
                        size: 6,
                        symbol: 'circle',
                        line: {
                            color: 'rgb(255, 0, 0)',
                            opacity: 0.1,
                            width: .5
                        },
                        opacity: 1},
                    type: 'scatter3d'};
                var trace2 = {
                    x:[-1, -2.858], y: [3.1, -10.2024], z: [6.8, 15.1032],
                    mode: 'markers',
                    marker: {
                        color: 'rgba(0, 255, 0)',
                        size: 20,
                        symbol: 'circle',
                        line: {
                            color: 'rgb(0, 0, 0)',
                            opacity: 0.1,
                            width: .5
                        },
                        opacity: 1},
                    type: 'scatter3d'};
                var trace3 = {
                    x:myx, y: myy, z: myz,
                    mode: 'markers',
                    marker: {
                        color: 'rgba(255, 255, 0)',
                        size: 10,
                        symbol: 'circle',
                        line: {
                            color: 'rgb(0, 0, 0)',
                            opacity: 0.1,
                            width: .5
                        },
                        opacity: 1},
                    type: 'scatter3d'
                };
                var trace4 = {
                    x:myxIn, y: myyIn, z: myzIn,
                    mode: 'markers',
                    marker: {
                        color: 'rgba(0, 255, 0)',
                        size: 10,
                        symbol: 'circle',
                        line: {
                            color: 'rgb(0, 0, 0)',
                            opacity: 0.1,
                            width: .5
                        },
                        opacity: 1},
                    type: 'scatter3d'};

                var data = [trace0, trace1, trace2, trace3, trace4];
                var layout = {
                    hovermode: true,
                    
                    scene : {
                        xaxis: {
                            autorange: true,
                            showgrid: false,
                            zeroline: false,
                            showline: false,
                            autotick: true,
                            ticks: '',
                            showticklabels: false,
                            title: "",
                        },
                        yaxis: {
                            autorange: true,
                            showgrid: false,
                            zeroline: false,
                            showline: false,
                            autotick: true,
                            ticks: '',
                            showticklabels: false,
                            title: "",
                        },
                        zaxis: {
                            autorange: true,
                            showgrid: false,
                            zeroline: false,
                            showline: false,
                            autotick: true,
                            ticks: '',
                            showticklabels: false,
                            title: "",
                        }
                    }
                };
                
                //console.log(data);
                Plotly.newPlot('tester', data, layout, {displaylogo: false, displayModeBar: false, markeredgewidth:0.0});
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
                            //display: false,
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(0, 0, 0, 1)'
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
                        color: 'rgba(0, 0, 0, 0)',
                        zeroLineColor: 'rgba(0, 0, 0, 1)'
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
