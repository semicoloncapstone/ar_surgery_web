import Ember from 'ember';
/*
TODO for 3D, check for qs,
get target pos, multiply it by our factor of 3.88, get relative position from origin
target position-> get target pos ^, +3.88*point
*/

/*
make an incision point, need to make sure they follow that path directly to target, calculate angle different between tool and what they should have followed

also find angle between the true path and the path they should of followed, IE how accurate was their incision point
*/
export default Ember.Component.extend({
    store: Ember.inject.service(),
    poll: Ember.inject.service(),
    dataID: null,
    numberData: null,
    numberData1: null,
    numberData2: null,
    barOptions: null,
    barOptions1: null,
    barOptions2: null,
    myData: [],
    myData1: [],
    myData2: [],
    dataObject: null,
    duration: null,
    maxDistance: null,
    nose: {x:-.263, y: -1.306, z: 13.3},
    scaleFactor: 3.88,
    myAngle: null,
    timeInSkull: 0,
    currentDisp:0,
    myxAll: [],
    myyAll: [],
    myzAll: [],
    isPlaying: false,
    buttonIcon: 'fas fa-play',
    PP: 'Play',
    buttonColor: 'w3-green',

    /* VARIABLES FOR UI */
    perf: "w3-black",
    threeD: 'w3-blue',
    isPerfData: false,
    isThreeData: true,
    willDestroyElement() {
        this.get('poll').stopAll();
        this.get('poll').clearAll();
    },
    init(){
        this._super(...arguments);
        var self = this;
        this.set('myData', []);
        this.set('myData1', []);
        this.set('myData2', []);
        
        //this.get('poll').stopPollByLabel( 'my-poll' );
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
            var myxIn2 = [];
            var myyIn2 = [];
            var myzIn2 = [];
            var target = {x: 0, y:0, z:0};
            var target2 = {x: 0, y:0, z:0};
            var noseToTarget = {x: 0, y:0, z:0};
            var flipFactor = 1;
            //console.log("Target Position in Unity");
            //console.log(self.get('dataObject').get('target').get('position')[0]+", "+self.get('dataObject').get('target').get('position')[1]+", "+self.get('dataObject').get('target').get('position')[2]);
            //console.log("refCube Position in Unity");
            //console.log(self.get('dataObject').get('refCube').get('position')[0]+", "+self.get('dataObject').get('refCube').get('position')[1]+", "+self.get('dataObject').get('refCube').get('position')[2]);
            
            noseToTarget.x = self.get('dataObject').get('target').get('position')[0]-self.get('dataObject').get('refCube').get('position')[0];
            noseToTarget.y = self.get('dataObject').get('target').get('position')[1]-self.get('dataObject').get('refCube').get('position')[1];
            noseToTarget.z = self.get('dataObject').get('target').get('position')[2]-self.get('dataObject').get('refCube').get('position')[2];
            noseToTarget.x = noseToTarget.x * self.get('scaleFactor');
            noseToTarget.y = noseToTarget.y * self.get('scaleFactor');
            noseToTarget.z = noseToTarget.z * self.get('scaleFactor');
            //console.log("nose to Target");
            //console.log(noseToTarget);
            
            target.x = self.get('nose').x + noseToTarget.x;
            target.y = self.get('nose').y+ noseToTarget.y;
            target.z = self.get('nose').z+ noseToTarget.z;

            //GETTING FIRST POINT TO SEE IF ITS FLIPPED
            z = self.get('dataObject').get('toolPoints').objectAt(0).get('position')[2];
            y = self.get('nose').y+ noseToTarget.z + z*self.get('scaleFactor');
            if (y<-2)
            {   
                console.log("flipped");
                flipFactor = -1;
            }
            
            target2.x = self.get('nose').x + noseToTarget.x*flipFactor;
            target2.y = self.get('nose').y+ noseToTarget.z*flipFactor;
            target2.z = self.get('nose').z+ noseToTarget.y;
            //console.log("Target in Graph");
            //console.log(target);
            
            for (var i =0; i<length; i++)//plotly loop
            {
                x = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[0];
                y = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[1];
                z = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[2];
                
                if (true)//self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull'))
                {
                    var tempx = target2.x + x*self.get('scaleFactor')*flipFactor;
                    var tempy= target2.y + z*self.get('scaleFactor')*flipFactor;
                    var tempz= target2.z+y*self.get('scaleFactor');

                    if (i<1)
                    {
                        myx.push(tempx);
                        myy.push(tempy);
                        myz.push(tempz);
                    }
                    else if (false)
                    {
                        myxIn2.push(tempx);
                        myyIn2.push(tempy);
                        myzIn2.push(tempz);
                    }
                    else {
                        myxIn.push(tempx);
                        myyIn.push(tempy);
                        myzIn.push(tempz);
                        self.get('myxAll').push(tempx);
                        self.get('myyAll').push(tempy);
                        self.get('myzAll').push(tempz);
                    }
                }
                else {
                    var tempx = target2.x + x*self.get('scaleFactor')*flipFactor;
                    var tempy= target2.y + z*self.get('scaleFactor')*flipFactor;
                    var tempz= target2.z+y*self.get('scaleFactor');
                    
                    
                    myxIn.push(tempx);
                    myyIn.push(tempy);
                    myzIn.push(tempz);
                }
                
                
            }
            var lastTimeInSkull = 0;
            for (var i =length-1; i>0; i--)//IP loop phase 2, distance
            {
                if (self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull')){
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
                    self.get('myData1').push({ x: time, y:distance});
                }
                else 
                {
                    lastTimeInSkull = i;
                    break;
                }
            }
            /*console.log('jere');
            console.log(self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')); ANGLE<<<<<<<<<<<<
            x = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')[0];
            y = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')[1];
            z = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')[2];
            var x2 = self.get('dataObject').get('truePath')[0];
            var y2 = self.get('dataObject').get('truePath')[1];
            var z2 = self.get('dataObject').get('truePath')[2];
            var angle = Math.acos((Math.abs(x*x2 + y*y2 + z*z2)/(Math.sqrt(x*x + y*y + z*z)* Math.sqrt(x2*x2 + y2*y2 + z2*z2) ) ) );
            console.log(x*x2 +"+"+ y*y2 +"+"+ z*z2);
            console.log(Math.sqrt(x*x + y*y + z*z));
            console.log(Math.sqrt(x2*x2 + y2*y2 + z2*z2));
            console.log(Math.abs(x*x2 + y*y2 + z*z2)/(Math.sqrt(x*x + y*y + z*z)* Math.sqrt(x2*x2 + y2*y2 + z2*z2)));
            console.log(angle);
            self.set('myAngle', angle*(180/Math.PI));*/
            self.set('numberData1', {
                    
                    datasets: [
                        {
                            backgroundColor: "rgba(0,0,128,.9)",
                            
                            data: self.get('myData1')
                        }
                    ]
                    
            });
            var incisionx;
            var incisiony;
            var incisionz;
            if (lastTimeInSkull == length-1)
            {
                incisionx = 0;
                incisiony = 0;
                incisionz = 0;
            }
            else{
                incisionx = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull+1).get('position')[0];
                incisiony = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull+1).get('position')[1];
                incisionz = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull+1).get('position')[2];
            }
            for (var i =0; i<=lastTimeInSkull; i++)//IP loop phase 1, distance
            {
                x = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[0];
                y = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[1];
                z = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[2];
                distance = Math.sqrt((incisionx-x)*(incisionx-x) + (incisiony-y)*(incisiony-y) + (incisionz-z)*(incisionz-z));
                if (distance>max)
                {
                    max = distance;
                    self.set('maxDistance', max);
                }
                time = self.get('dataObject').get('toolPoints').objectAt(i).get('time') - initialTime;
                self.get('myData').push({ x: time, y:distance});

                if (self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull')){
                    
                }
                
            }
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
                    name: 'Skull',                        
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
                    name: 'Ventricles',
                    type: 'scatter3d'};
                var trace2 = {
                    x:[target.x, target2.x, self.get('nose').x], y: [target.y, target2.y, self.get('nose').y], z: [target.z, target2.z, self.get('nose').z],
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
                    name: 'Target',
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
                    name: 'In Skull',
                    type: 'scatter3d',
                    
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
                    name: 'Tracked Path',
                    type: 'scatter3d'};
                var trace5 = {
                    x:myxIn2, y: myyIn2, z: myzIn2,
                    mode: 'markers',
                    marker: {
                        color: 'rgba(0, 255, 255)',
                        size: 10,
                        symbol: 'circle',
                        line: {
                            color: 'rgb(0, 0, 0)',
                            opacity: 0.1,
                            width: .5
                        },
                        opacity: 1},
                    name: 'Tracked Path2',
                    type: 'scatter3d'
                };

                var data = [trace0, trace1, trace2, trace3, trace4];
                var layout = {
                    hovermode: true,
                    scene : {
                        xaxis: {
                            autorange: true,
                            //showgrid: false,
                            //zeroline: false,
                            showline: false,
                            autotick: true,
                            ticks: '',
                            showticklabels: false,
                            title: "",
                        },
                        yaxis: {
                            autorange: true,
                            //showgrid: false,
                            //zeroline: false,
                            showline: false,
                            autotick: true,
                            ticks: '',
                            showticklabels: false,
                            title: "",
                        },
                        zaxis: {
                            autorange: true,
                            //showgrid: false,
                            //zeroline: false,
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
        self.set('barOptions1', {
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
                    text: 'Performance Phase 2 - Distance'
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
                            labelString: 'Distance to Target',
                            
                        },
                        ticks: {
                                suggestedMin: 0,
                                //suggestedMax: this.get('maxDistance')+2, 
                        }
                    }],
                xAxes: [{
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)',
                        zeroLineColor: 'rgba(0, 0, 0, 1)'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time(s)'
                    },
                    ticks: {
                            suggestedMin: 0,
                            //suggestedMax: this.get('duration') + 2,
                            
                        }
                    }]
                }
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
                    text: 'Performance Phase 1 - Distance'
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
                            labelString: 'Distance to Incision Point',
                            
                        },
                        ticks: {
                                suggestedMin: 0,
                                //suggestedMax: this.get('maxDistance')+2, 
                        }
                    }],
                xAxes: [{
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)',
                        zeroLineColor: 'rgba(0, 0, 0, 1)'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time(s)'
                    },
                    ticks: {
                            suggestedMin: 0,
                            //suggestedMax: this.get('duration') + 2,
                            
                        }
                    }]
                }
            });
        

        
    },
    
    actions: {
        pressPerf(){
            this.get('poll').stopAll();
            this.get('poll').clearAll();
            this.set('perf', 'w3-blue');
            this.set('threeD', 'w3-black')

            this.set('isPerfData', true);
            this.set('isThreeData', false);
        },

        pressThree(){
            this.set('perf', 'w3-black');
            this.set('threeD', 'w3-blue')

            this.set('isPerfData', false);
            this.set('isThreeData', true);
            var self = this;
            this.set('myData', []);
            this.set('myData1', []);
            this.set('myData2', []);
            
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
                var myxIn2 = [];
                var myyIn2 = [];
                var myzIn2 = [];
                var target = {x: 0, y:0, z:0};
                var target2 = {x: 0, y:0, z:0};
                var noseToTarget = {x: 0, y:0, z:0};
                var flipFactor = 1;
                //console.log("Target Position in Unity");
                //console.log(self.get('dataObject').get('target').get('position')[0]+", "+self.get('dataObject').get('target').get('position')[1]+", "+self.get('dataObject').get('target').get('position')[2]);
                //console.log("refCube Position in Unity");
                //console.log(self.get('dataObject').get('refCube').get('position')[0]+", "+self.get('dataObject').get('refCube').get('position')[1]+", "+self.get('dataObject').get('refCube').get('position')[2]);
                
                noseToTarget.x = self.get('dataObject').get('target').get('position')[0]-self.get('dataObject').get('refCube').get('position')[0];
                noseToTarget.y = self.get('dataObject').get('target').get('position')[1]-self.get('dataObject').get('refCube').get('position')[1];
                noseToTarget.z = self.get('dataObject').get('target').get('position')[2]-self.get('dataObject').get('refCube').get('position')[2];
                noseToTarget.x = noseToTarget.x * self.get('scaleFactor');
                noseToTarget.y = noseToTarget.y * self.get('scaleFactor');
                noseToTarget.z = noseToTarget.z * self.get('scaleFactor');
                //console.log("nose to Target");
                //console.log(noseToTarget);
                
                target.x = self.get('nose').x + noseToTarget.x;
                target.y = self.get('nose').y+ noseToTarget.y;
                target.z = self.get('nose').z+ noseToTarget.z;

                //GETTING FIRST POINT TO SEE IF ITS FLIPPED
                z = self.get('dataObject').get('toolPoints').objectAt(0).get('position')[2];
                y = self.get('nose').y+ noseToTarget.z + z*self.get('scaleFactor');
                if (y<-2)
                {   
                    console.log("flipped");
                    flipFactor = -1;
                }
                
                target2.x = self.get('nose').x + noseToTarget.x*flipFactor;
                target2.y = self.get('nose').y+ noseToTarget.z*flipFactor;
                target2.z = self.get('nose').z+ noseToTarget.y;
                //console.log("Target in Graph");
                //console.log(target);
                
                for (var i =0; i<length; i++)//plotly loop
                {
                    x = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[0];
                    y = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[1];
                    z = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[2];
                    
                    if (self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull'))//self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull'))
                    {
                        var tempx = target2.x + x*self.get('scaleFactor')*flipFactor;
                        var tempy= target2.y + z*self.get('scaleFactor')*flipFactor;
                        var tempz= target2.z+y*self.get('scaleFactor');

                        if (true)
                        {
                            myx.push(tempx);
                            myy.push(tempy);
                            myz.push(tempz);
                        }
                        else if (i<40)
                        {
                            myxIn2.push(tempx);
                            myyIn2.push(tempy);
                            myzIn2.push(tempz);
                        }
                        else {
                            myxIn.push(tempx);
                            myyIn.push(tempy);
                            myzIn.push(tempz);
                        }
                    }
                    else {
                        var tempx = target2.x + x*self.get('scaleFactor')*flipFactor;
                        var tempy= target2.y + z*self.get('scaleFactor')*flipFactor;
                        var tempz= target2.z+y*self.get('scaleFactor');
                        
                        
                        myxIn.push(tempx);
                        myyIn.push(tempy);
                        myzIn.push(tempz);
                    }
                    
                    
                }
                var lastTimeInSkull = 0;
                for (var i =length-1; i>0; i--)//IP loop phase 2, distance
                {
                    if (self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull')){
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
                        self.get('myData1').push({ x: time, y:distance});
                    }
                    else 
                    {
                        lastTimeInSkull = i;
                        break;
                    }
                }
                /*console.log('jere');
                console.log(self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')); ANGLE<<<<<<<<<<<<
                x = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')[0];
                y = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')[1];
                z = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull).get('position')[2];
                var x2 = self.get('dataObject').get('truePath')[0];
                var y2 = self.get('dataObject').get('truePath')[1];
                var z2 = self.get('dataObject').get('truePath')[2];
                var angle = Math.acos((Math.abs(x*x2 + y*y2 + z*z2)/(Math.sqrt(x*x + y*y + z*z)* Math.sqrt(x2*x2 + y2*y2 + z2*z2) ) ) );
                console.log(x*x2 +"+"+ y*y2 +"+"+ z*z2);
                console.log(Math.sqrt(x*x + y*y + z*z));
                console.log(Math.sqrt(x2*x2 + y2*y2 + z2*z2));
                console.log(Math.abs(x*x2 + y*y2 + z*z2)/(Math.sqrt(x*x + y*y + z*z)* Math.sqrt(x2*x2 + y2*y2 + z2*z2)));
                console.log(angle);
                self.set('myAngle', angle*(180/Math.PI));*/
                self.set('numberData1', {
                        
                        datasets: [
                            {
                                backgroundColor: "rgba(0,0,128,.9)",
                                
                                data: self.get('myData1')
                            }
                        ]
                        
                });
                var incisionx;
                var incisiony;
                var incisionz;
                if (lastTimeInSkull == length-1)
                {
                    incisionx = 0;
                    incisiony = 0;
                    incisionz = 0;
                }
                else{
                    incisionx = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull+1).get('position')[0];
                    incisiony = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull+1).get('position')[1];
                    incisionz = self.get('dataObject').get('toolPoints').objectAt(lastTimeInSkull+1).get('position')[2];
                }
                for (var i =0; i<=lastTimeInSkull; i++)//IP loop phase 1, distance
                {
                    x = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[0];
                    y = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[1];
                    z = self.get('dataObject').get('toolPoints').objectAt(i).get('position')[2];
                    distance = Math.sqrt((incisionx-x)*(incisionx-x) + (incisiony-y)*(incisiony-y) + (incisionz-z)*(incisionz-z));
                    if (distance>max)
                    {
                        max = distance;
                        self.set('maxDistance', max);
                    }
                    time = self.get('dataObject').get('toolPoints').objectAt(i).get('time') - initialTime;
                    self.get('myData').push({ x: time, y:distance});

                    if (self.get('dataObject').get('toolPoints').objectAt(i).get('inSkull')){
                        
                    }
                    
                }
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
                        name: 'Skull',                        
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
                        name: 'Ventricles',
                        type: 'scatter3d'};
                    var trace2 = {
                        x:[target.x, 29.177, target2.x, self.get('nose').x], y: [target.y, 4.454, target2.y, self.get('nose').y], z: [target.z, 3.792, target2.z, self.get('nose').z],
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
                        name: 'Target',
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
                        name: 'In Skull',
                        type: 'scatter3d',
                        
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
                        name: 'Tracked Path',
                        type: 'scatter3d'};
                    var trace5 = {
                        x:myxIn2, y: myyIn2, z: myzIn2,
                        mode: 'markers',
                        marker: {
                            color: 'rgba(0, 255, 255)',
                            size: 10,
                            symbol: 'circle',
                            line: {
                                color: 'rgb(0, 0, 0)',
                                opacity: 0.1,
                                width: .5
                            },
                            opacity: 1},
                        name: 'Tracked Path2',
                        type: 'scatter3d'
                    };

                    var data = [trace0, trace1, trace2, trace3, trace4, trace5];
                    var layout = {
                        hovermode: true,
                        
                        scene : {
                            xaxis: {
                                autorange: true,
                                //showgrid: false,
                                //zeroline: false,
                                showline: false,
                                autotick: true,
                                ticks: '',
                                showticklabels: false,
                                title: "",
                            },
                            yaxis: {
                                autorange: true,
                                //showgrid: false,
                                //zeroline: false,
                                showline: false,
                                autotick: true,
                                ticks: '',
                                showticklabels: false,
                                title: "",
                            },
                            zaxis: {
                                autorange: true,
                                //showgrid: false,
                                //zeroline: false,
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
            self.set('barOptions1', {
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
                        text: 'Performance Phase 2 - Distance'
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
                                labelString: 'Distance to Target',
                                
                            },
                            ticks: {
                                    suggestedMin: 0,
                                    //suggestedMax: this.get('maxDistance')+2, 
                            }
                        }],
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(0, 0, 0, 1)'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time(s)'
                        },
                        ticks: {
                                suggestedMin: 0,
                                //suggestedMax: this.get('duration') + 2,
                                
                            }
                        }]
                    }
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
                        text: 'Performance Phase 1 - Distance'
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
                                labelString: 'Distance to Incision Point',
                                
                            },
                            ticks: {
                                    suggestedMin: 0,
                                    //suggestedMax: this.get('maxDistance')+2, 
                            }
                        }],
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(0, 0, 0, 1)'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time(s)'
                        },
                        ticks: {
                                suggestedMin: 0,
                                //suggestedMax: this.get('duration') + 2,
                                
                            }
                        }]
                    }
                });
        },
        moveGraph(){
            if(this.get('isPlaying')){
                this.get('poll').stopAll();
                this.get('poll').clearAll();
                this.set('buttonIcon', 'fas fa-play');
                this.set('PP', 'Play');
                this.set('buttonColor', 'w3-green');
                this.set('isPlaying', false);
                console.log('here');
            }
            else {
                var graphDiv = document.getElementById('tester');
                console.log(graphDiv.data.length);
                if (graphDiv.data.length == 5)
                {
                    Plotly.deleteTraces(tester, 4);
                }
                
                this.get('poll').addPoll({
                interval: 300,
                label: 'my-poll',
                callback: () => {
                        Plotly.animate('tester', {
                            data: [{x: [this.get('myxAll').objectAt(this.get('currentDisp')),this.get('myxAll').objectAt((this.get('currentDisp')+1)%this.get('myxAll').length),this.get('myxAll').objectAt((this.get('currentDisp')+2)%this.get('myxAll').length)], 
                            y:[this.get('myyAll').objectAt(this.get('currentDisp')),this.get('myyAll').objectAt((this.get('currentDisp')+1)%this.get('myyAll').length),this.get('myyAll').objectAt((this.get('currentDisp')+2)%this.get('myxAll').length)], 
                            z:[this.get('myzAll').objectAt(this.get('currentDisp')),this.get('myzAll').objectAt((this.get('currentDisp')+1)%this.get('myzAll').length),this.get('myzAll').objectAt((this.get('currentDisp')+2)%this.get('myxAll').length)]}],
                            traces:[3],
                            layout:{}
                        },
                        {transition: {
                            duration: 0
                        },
                        frame: {
                            duration: 0,
                            redraw: false
                        }});
                        this.set('currentDisp', (this.get('currentDisp')+3)%this.get('myzAll').length);
                    }
                }); 
                this.set('isPlaying', true);
                this.set('buttonIcon', 'fas fa-stop');
                this.set('PP', 'Stop');
                this.set('buttonColor', 'w3-red')
            }
            
            //this.send('moveGraph');
        },
        load(){
            
        },
    }
});


/**
 * 
 * perf: "w3-blue",
    threeD: 'w3-black',
    isPerfData: true,
    isThreeData: false,
 */