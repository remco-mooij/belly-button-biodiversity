
    d3.json("samples.json").then((importedData) => {
        var data = importedData;

        var trace1 = {
            type: 'bar',
            x: data.samples.map(row => row[1]),
            y: data.samples.map(row => row[1]),
            orientation: 'h'
        };

        var chartData = [trace1];

    Plotly.newPlot("bar", chartData);

    });

// buildPlot();   