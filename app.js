
    d3.json("samples.json").then((importedData) => {
        var data = importedData;
        var xValues = data.map(row => row.samples.otu_ids);
        var yValues = data.map(row => row.samples.sample_values);

        console.log(xValues);

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

    Plotly.newPlot("bar", chartData, layout);

    });

// buildPlot();   