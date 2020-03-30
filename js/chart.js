var idps = []; // dataPoints
var hdps = [];

window.onload = function() {

    var idps = []; // dataPoints
    var hdps = [];
    // var cdps = [];
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        animationEnabled: true,
        backgroundColor:"#000000",

        axisX: {
            title: "No. of Days ",
        },
        toolTip: {
            shared: true,
        },
        axisY: {
            title: "No. of People",
            includeZero: false,
            gridThickness: 0
        },
        data: [{
                name: "Infected",
                lineColor: "red",
                color: "red",
                type: "line",
                showInLegend: true,
                dataPoints: idps
            },
            {
                name: "Healthy",
                lineColor: "green",
                color: "green",
                type: "line",
                showInLegend: true,
                dataPoints: hdps
            },
            // {
            //     name: "Cured",
            //     lineColor: "yellow",
            //     color: "yellow",
            //     type: "line",
            //     showInLegend: true,
            //     dataPoints: cdps
            // }
        ]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 500;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function(count) {

        count = count || 1;

        for (var j = 0; j < count; j++) {
            idps.push({
                x: int(frameCount / 10),
                y: numInfec
            });
            hdps.push({
                x: int(frameCount / 10),
                y: numHealt
            });
            // cdps.push({
            //     x: int(frameCount / 10),
            //     y: numCured
            // });
        }



        chart.render();
    };

    updateChart(dataLength);
    setInterval(function() { updateChart() }, updateInterval);

}


// chart.exportChart()