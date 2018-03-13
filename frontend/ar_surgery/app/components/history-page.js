import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    dataID: "5a9daf70c2ef162fcf26ca62",

    init(){
        this._super(...arguments);
        Plotly.d3.csv('http://localhost:3700/skull.csv', function(err, rows){
            function unpack(rows, key) {
                return rows.map(function(row)
                { return row[key]; });}

            var trace1 = {
                x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
                mode: 'markers',
                marker: {
                    size: 6,
                    line: {
                    color: 'rgba(0, 0, 0, 1)',
                    width: 0.5},
                    markeredgewidth: 0.0,
                    opacity: 0.1},
                    
                type: 'scatter3d'
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
                type: 'scatter3d'};*/

            var data = [trace1];
            var layout = {
                hovermode: false,
                
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
            Plotly.newPlot('tester', data, layout, {displaylogo: false, displayModeBar: false});
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
        
    }
});
