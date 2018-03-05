import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    dataID: null,
    numberData: null,
    barOptions: null,
    myData: [],
    somethingelse: null,
    init(){
        this._super(...arguments);
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
        this.set('somethingelse', "hello");
        
        this.get('myData').push({ x:10, y:20});
        this.get('myData').push({ x:9, y:25});
        this.get('myData').push({ x:2, y:18});
        this.get('myData').push({ x:17, y:12});
        this.set('barOptions', {
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
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Students',
                        
                    },
                    ticks: {
                            suggestedMin: 0,
                            suggestedMax: 5+2,
                            fixedStepSize: 1,
                        }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Assesment Code'
                    }
                    }]
                }
            });
            this.set('numberData', {
                    labels: ["hello1", "hello2","hello3","hello4","hello5"],
                    datasets: [
                        {
                            backgroundColor: "rgba(0,0,128,.9)",
                            borderWidth: 1,
                            data: this.get('myData')
                        }
                    ]
                    
                });

        
    },
    
    actions: {

    }
});
