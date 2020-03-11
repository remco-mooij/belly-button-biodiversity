
    d3.json("samples.json").then((importedData) => {
        var data = importedData;
        var xValues = data.samples.map(row => row.otu_ids);
        var yValues = data.samples.map(row => row.sample_values);


        var trace1 = {
            type: 'bar',
            x: xValues,
            y: yValues,
            orientation: 'h'
        };

        var chartData = [trace1];

        var layout = {
            xaxis: {
                range: [xValues]
            }
        };

    Plotly.newPlot("bar", chartData);

    });

// buildPlot();   