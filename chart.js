
// function to contain logic for getting data and processing data.
var dataChart = (function(dataChart){
	// variable for globel name space
	dataChart.rawData = [];
	dataChart.formattedData = [];
	dataChart.chartId = 'chart';


	dataChart.opts = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Looking For Stuff'
        },
        subtitle: {
            text: 'Data from Something'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: 'nums'
            },
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null
        },
        tooltip: {
            valueSuffix: ' nums'
        },
        plotOptions: {
            spline: {
                lineWidth: 1,
                animation: true,
                states: {
                    hover: {
                        lineWidth: 2
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    };

    dataChart.init = function(json, chartId){

    	dataChart.rawData = json;
    	dataChart.chartId = chartId;
    	dataChart.process(json);
    	dataChart.draw();
    	attachEventListeners();
    };

    dataChart.process = function(json){

    	dataChart.opts.series = [];

    	$.each(json, function(index, obj){
    		var tempData = [];

    		$.each(obj.history, function(index2, obj2){
    			tempData.push([obj2.timestamp*1000, obj2.reading]);
    		});

    		tempData.sort(function(a,b){
    			return a[0] - b[0];
    		});

    		dataChart.opts.series.push({
    			name: obj.id,
    			data: tempData
    		});

    		console.log('tempData',tempData);
    	});
    };

    dataChart.draw = function(){
    	$('#'+dataChart.chartId).highcharts(dataChart.opts);
    }
	return dataChart;
})(dataChart || {});