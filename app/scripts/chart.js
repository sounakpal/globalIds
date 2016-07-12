(function() {
    var chart = AmCharts.makeChart("chartdiv1", {
        "type": "xy",
        "theme": "light",
        "marginRight": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "startDuration": 1.5,
        "trendLines": [],
        "balloon": {
            "adjustBorderColor": false,
            "shadowAlpha": 0,
            "fixedPosition": true
        },
        "graphs": [{
            "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>channel:<b>[[y]]</b><br>Total:<b>[[value]]</b></div>",
            "bullet": "round",
            "id": "AmGraph-2",
            "bulletColor": "#fd786c",
            "lineAlpha": 0,
            "lineColor": "#fcd202",
            "valueField": "bValue",
            "xField": "date",
            "yField": "by"
        }],
        "valueAxes": [{
            "id": "ValueAxis-1",
            "axisAlpha": 0
        }, {
            "id": "ValueAxis-2",
            "axisAlpha": 0,
            "position": "bottom",
            "type": "date",
            "minimumDate": new Date(2014, 11, 31),
            "maximumDate": new Date(2015, 0, 13)
        }],
        "allLabels": [],
        "titles": [],
        "dataProvider": [{
            "date": "2015-01-01",
            "ay": 6.5,
            "by": 2.2,
            "aValue": 15,
            "bValue": 10
        }, {
            "date": "2015-01-02",
            "ay": 12.3,
            "by": 4.9,
            "aValue": 8,
            "bValue": 3
        }, {
            "date": "2015-01-03",
            "ay": 12.3,
            "by": 5.1,
            "aValue": 16,
            "bValue": 4
        }, {
            "date": "2015-01-04",
            "ay": 2.8,
            "by": 13.3,
            "aValue": 9,
            "bValue": 13
        }, {
            "date": "2015-01-05",
            "ay": 3.5,
            "by": 6.1,
            "aValue": 5,
            "bValue": 2
        }, {
            "date": "2015-01-06",
            "ay": 5.1,
            "by": 8.3,
            "aValue": 10,
            "bValue": 17
        }, {
            "date": "2015-01-07",
            "ay": 6.7,
            "by": 10.5,
            "aValue": 3,
            "bValue": 10
        }, {
            "date": "2015-01-08",
            "ay": 8,
            "by": 12.3,
            "aValue": 5,
            "bValue": 13
        }, {
            "date": "2015-01-09",
            "ay": 8.9,
            "by": 4.5,
            "aValue": 8,
            "bValue": 11
        }, {
            "date": "2015-01-10",
            "ay": 9.7,
            "by": 15,
            "aValue": 15,
            "bValue": 10
        }, {
            "date": "2015-01-11",
            "ay": 10.4,

            "by": 10.8,
            "aValue": 1,
            "bValue": 11
        }, {
            "date": "2015-01-12",
            "ay": 1.7,
            "by": 19,
            "aValue": 12,
            "bValue": 3
        }],

        "export": {
            "enabled": true
        },
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "AmGraph-2",
            "scrollbarHeight": 40,
            "backgroundColor": "#cfd2d9",
            "selectedBackgroundColor": "#07c6fa"
        },
        "hideYScrollbar": true,
        "chartCursor": {
            "limitToGraph": "AmGraph-2",
            "pan": true,
            "cursorAlpha": 0,
            "valueLineAlpha": 0
        }
    });

})();
(function() {

    var chart;
    var chartData = [];

    AmCharts.ready(function() {
        // generate some random data first
        generateChartData();

        // SERIAL CHART
        chart = new AmCharts.AmSerialChart();

        chart.dataProvider = chartData;
        chart.categoryField = "date";

        // listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
        chart.addListener("dataUpdated", zoomChart);

        chart.synchronizeGrid = true; // this makes all axes grid to be at the same intervals

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
        categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
        categoryAxis.minorGridEnabled = true;
        categoryAxis.axisColor = "#DADADA";
        categoryAxis.twoLineMode = true;
        categoryAxis.dateFormats = [{
            period: 'fff',
            format: 'JJ:NN:SS'
        }, {
            period: 'ss',
            format: 'JJ:NN:SS'
        }, {
            period: 'mm',
            format: 'JJ:NN'
        }, {
            period: 'hh',
            format: 'JJ:NN'
        }, {
            period: 'DD',
            format: 'DD'
        }, {
            period: 'WW',
            format: 'DD'
        }, {
            period: 'MM',
            format: 'MMM'
        }, {
            period: 'YYYY',
            format: 'YYYY'
        }];

        // first value axis (on the left)
        var valueAxis1 = new AmCharts.ValueAxis();
        valueAxis1.axisColor = "#FF6600";
        valueAxis1.axisThickness = 2;
        chart.addValueAxis(valueAxis1);

        // second value axis (on the right)
        var valueAxis2 = new AmCharts.ValueAxis();
        valueAxis2.position = "right"; // this line makes the axis to appear on the right
        valueAxis2.axisColor = "#FCD202";
        valueAxis2.gridAlpha = 0;
        valueAxis2.axisThickness = 2;
        chart.addValueAxis(valueAxis2);


        // GRAPHS
        // first graph
        var graph1 = new AmCharts.AmGraph();
        graph1.valueAxis = valueAxis1; // we have to indicate which value axis should be used
        graph1.title = "channel 1";
        graph1.valueField = "visits";
        graph1.bullet = "round";
        graph1.hideBulletsCount = 30;
        graph1.bulletBorderThickness = 1;
        chart.addGraph(graph1);

        // second graph
        var graph2 = new AmCharts.AmGraph();
        graph2.valueAxis = valueAxis2; // we have to indicate which value axis should be used
        graph2.title = "channel 2";
        graph2.valueField = "hits";
        graph2.bullet = "square";
        graph2.hideBulletsCount = 30;
        graph2.bulletBorderThickness = 1;
        chart.addGraph(graph2);


        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0.1;
        chartCursor.fullWidth = true;
        chartCursor.valueLineBalloonEnabled = true;
        chart.addChartCursor(chartCursor);

        // LEGEND
        var legend = new AmCharts.AmLegend();
        legend.marginLeft = 110;
        legend.useGraphSettings = true;
        chart.addLegend(legend);

        // WRITE
        chart.write("chartdiv2");
    });

    // generate some random data, quite different range
    function generateChartData() {
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 50);

        for (var i = 0; i < 50; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            var visits = Math.round(Math.random() * 40) + 100;
            var hits = Math.round(Math.random() * 80) + 500;
            var views = Math.round(Math.random() * 6000);

            chartData.push({
                date: newDate,
                visits: visits,
                hits: hits,
                views: views
            });
        }
    }

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(10, 20);
    }

})();
//System charts
(function(){
    var chart = AmCharts.makeChart("chartdiv3", {
        "type": "serial",
        "theme": "light",
        "marginTop":0,
        "marginRight": 20,
        "dataProvider": [{
            "year": "1950",
            "value": 10
        }, {
            "year": "1951",
            "value": 20
        }, {
            "year": "1952",
            "value": 30
        }, {
            "year": "1953",
            "value": 40
        }, {
            "year": "1954",
            "value": 20
        }, {
            "year": "1955",
            "value": 30
        }, {
            "year": "1956",
            "value": 10
        }, {
            "year": "1957",
            "value": 50
        }, {
            "year": "1958",
            "value": 60
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "graphs": [{
            "id":"g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "bulletSize": 8,         
            "lineColor": "#ddd",
            "lineThickness": 2,
            "negativeLineColor": "#637bb6",
            "type": "smoothedLine",
            "valueField": "value"
        }],
        "chartScrollbar": {
            "graph":"g1",
            "gridAlpha":0,
            "color":"#888888",
            "backgroundAlpha":0,
            "selectedBackgroundAlpha":1,
            "graphFillAlpha":0,
            "autoGridCount":true,
            "selectedGraphFillAlpha":0,
            "graphLineAlpha":0.2,
            "graphLineColor":"#c2c2c2",
            "selectedGraphLineColor":"#000",
            "selectedGraphLineAlpha":0,
                "scrollbarHeight": 40,
                "backgroundColor": "#cfd2d9",
                "selectedBackgroundColor": "#07c6fa"

        },
        "chartCursor": {
            "categoryBalloonDateFormat": "YYYY",
            "cursorAlpha": 0,
            "valueLineEnabled":true,
            "valueLineBalloonEnabled":true,
            "valueLineAlpha":0.5,
            "fullWidth":true
        },
        "dataDateFormat": "YYYY",
        "categoryField": "year",

        "export": {
            "enabled": true
        }
    });

})();


// (function() {

//     var chart;
//     var chartData = [];

//     AmCharts.ready(function() {
//         // generate some random data first
//         generateChartData();

//         // SERIAL CHART
//         chart = new AmCharts.AmSerialChart();

//         chart.dataProvider = chartData;
//         chart.categoryField = "date";

//         // listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
//         chart.addListener("dataUpdated", zoomChart);

//         chart.synchronizeGrid = true; // this makes all axes grid to be at the same intervals

//         // AXES
//         // category
//         var categoryAxis = chart.categoryAxis;
//         categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
//         categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
//         categoryAxis.minorGridEnabled = true;
//         categoryAxis.axisColor = "#DADADA";
//         categoryAxis.twoLineMode = true;
//         categoryAxis.dateFormats = [{
//             period: 'fff',
//             format: 'JJ:NN:SS'
//         }, {
//             period: 'ss',
//             format: 'JJ:NN:SS'
//         }, {
//             period: 'mm',
//             format: 'JJ:NN'
//         }, {
//             period: 'hh',
//             format: 'JJ:NN'
//         }, {
//             period: 'DD',
//             format: 'DD'
//         }, {
//             period: 'WW',
//             format: 'DD'
//         }, {
//             period: 'MM',
//             format: 'MMM'
//         }, {
//             period: 'YYYY',
//             format: 'YYYY'
//         }];

//         // first value axis (on the left)
//         var valueAxis1 = new AmCharts.ValueAxis();
//         valueAxis1.axisColor = "#FF6600";
//         valueAxis1.axisThickness = 2;
//         chart.addValueAxis(valueAxis1);

//         // second value axis (on the right)
//         var valueAxis2 = new AmCharts.ValueAxis();
//         valueAxis2.position = "right"; // this line makes the axis to appear on the right
//         valueAxis2.axisColor = "#FCD202";
//         valueAxis2.gridAlpha = 0;
//         valueAxis2.axisThickness = 2;
//         chart.addValueAxis(valueAxis2);


//         // GRAPHS
//         // first graph
//         var graph1 = new AmCharts.AmGraph();
//         graph1.id="some",
//         graph1.valueAxis = valueAxis1; // we have to indicate which value axis should be used
//         graph1.title = "channel 1";
//         graph1.valueField = "visits";
//         graph1.bullet = "round";
//         graph1.hideBulletsCount = 30;
//         graph1.bulletBorderThickness = 1;
//         chart.addGraph(graph1);

//         // second graph
//         var graph2 = new AmCharts.AmGraph();
//         graph2.valueAxis = valueAxis2; // we have to indicate which value axis should be used
//         graph2.title = "channel 2";
//         graph2.valueField = "hits";
//         graph2.bullet = "square";
//         graph2.hideBulletsCount = 30;
//         graph2.bulletBorderThickness = 1;
//         chart.addGraph(graph2);

//         var chartScrollbar = new AmCharts.ChartScrollbar();            
//         chartScrollbar.graph= "some";
//         chartScrollbar.gridAlpha= 0;
//         chartScrollbar.color= "#888888";
//         chartScrollbar.backgroundAlpha= 0;
//         chartScrollbar.selectedBackgroundAlpha= 1;
//         chartScrollbar.graphFillAlpha= 0;
//         chartScrollbar.autoGridCount= true;
//         chartScrollbar.selectedGraphFillAlpha= 0;
//         chartScrollbar.graphLineAlpha= 0.2;
//         chartScrollbar.graphLineColor= "#c2c2c2";
//         chartScrollbar.selectedGraphLineColor= "#000";
//         chartScrollbar.selectedGraphLineAlpha= 0;
//         chartScrollbar.scrollbarHeight=  40;
//         chartScrollbar.backgroundColor=  "#cfd2d9";
//         chartScrollbar.selectedBackgroundColor=  "#07c6fa";
//         chart.addChartScrollbar(chartScrollbar);

//         // CURSOR
//         var chartCursor = new AmCharts.ChartCursor();
//         chartCursor.cursorAlpha = 0.1;
//         chartCursor.fullWidth = true;
//         chartCursor.valueLineBalloonEnabled = true;
//         chart.addChartCursor(chartCursor);

//         // LEGEND
//         var legend = new AmCharts.AmLegend();
//         legend.marginLeft = 110;
//         legend.useGraphSettings = true;
//         chart.addLegend(legend);

//         // WRITE
//         chart.write("chartdiv4");
//     });

//     // generate some random data, quite different range
//     function generateChartData() {
//         var firstDate = new Date();
//         firstDate.setDate(firstDate.getDate() - 50);

//         for (var i = 0; i < 50; i++) {
//             // we create date objects here. In your data, you can have date strings
//             // and then set format of your dates using chart.dataDateFormat property,
//             // however when possible, use date objects, as this will speed up chart rendering.
//             var newDate = new Date(firstDate);
//             newDate.setDate(newDate.getDate() + i);

//             var visits = Math.round(Math.random() * 40) + 100;
//             var hits = Math.round(Math.random() * 80) + 500;
//             var views = Math.round(Math.random() * 6000);

//             chartData.push({
//                 date: newDate,
//                 visits: visits,
//                 hits: hits,
//                 views: views
//             });
//         }
//     }

//     // this method is called when chart is first inited as we listen for "dataUpdated" event
//     function zoomChart() {
//         // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
//         chart.zoomToIndexes(10, 20);
//     }

// })();

(function() {

    var chart;
    var chartData = [];

    AmCharts.ready(function() {
        // generate some random data first
        generateChartData();

        // SERIAL CHART
        chart = new AmCharts.AmSerialChart();

        chart.dataProvider = chartData;
        chart.categoryField = "date";

        // listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
        chart.addListener("dataUpdated", zoomChart);

        chart.synchronizeGrid = true; // this makes all axes grid to be at the same intervals

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
        categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
        categoryAxis.minorGridEnabled = true;
        categoryAxis.axisColor = "#DADADA";
        categoryAxis.twoLineMode = true;
        categoryAxis.dateFormats = [{
            period: 'fff',
            format: 'JJ:NN:SS'
        }, {
            period: 'ss',
            format: 'JJ:NN:SS'
        }, {
            period: 'mm',
            format: 'JJ:NN'
        }, {
            period: 'hh',
            format: 'JJ:NN'
        }, {
            period: 'DD',
            format: 'DD'
        }, {
            period: 'WW',
            format: 'DD'
        }, {
            period: 'MM',
            format: 'MMM'
        }, {
            period: 'YYYY',
            format: 'YYYY'
        }];

        // first value axis (on the left)
        var valueAxis1 = new AmCharts.ValueAxis();
        valueAxis1.axisColor = "#FF6600";
        valueAxis1.axisThickness = 2;
        chart.addValueAxis(valueAxis1);

        // second value axis (on the right)
        var valueAxis2 = new AmCharts.ValueAxis();
        valueAxis2.position = "right"; // this line makes the axis to appear on the right
        valueAxis2.axisColor = "#FCD202";
        valueAxis2.gridAlpha = 0;
        valueAxis2.axisThickness = 2;
        chart.addValueAxis(valueAxis2);


        // GRAPHS
        // first graph
        var graph1 = new AmCharts.AmGraph();
        graph1.valueAxis = valueAxis1; // we have to indicate which value axis should be used
        graph1.title = "system 1";
        graph1.valueField = "visits";
        graph1.bullet = "round";
        graph1.hideBulletsCount = 30;
        graph1.bulletBorderThickness = 1;
        chart.addGraph(graph1);

        // second graph
        var graph2 = new AmCharts.AmGraph();
        graph2.valueAxis = valueAxis2; // we have to indicate which value axis should be used
        graph2.title = "system 2";
        graph2.valueField = "hits";
        graph2.bullet = "square";
        graph2.hideBulletsCount = 30;
        graph2.bulletBorderThickness = 1;
        chart.addGraph(graph2);


        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0.1;
        chartCursor.fullWidth = true;
        chartCursor.valueLineBalloonEnabled = true;
        chart.addChartCursor(chartCursor);

        // LEGEND
        var legend = new AmCharts.AmLegend();
        legend.marginLeft = 110;
        legend.useGraphSettings = true;
        chart.addLegend(legend);

        // WRITE
        chart.write("chartdiv4");
    });

    // generate some random data, quite different range
    function generateChartData() {
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 50);

        for (var i = 0; i < 50; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            var visits = Math.round(Math.random() * 40) + 100;
            var hits = Math.round(Math.random() * 80) + 500;
            var views = Math.round(Math.random() * 6000);

            chartData.push({
                date: newDate,
                visits: visits,
                hits: hits,
                views: views
            });
        }
    }

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(10, 20);
    }

})();