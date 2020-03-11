
    d3.json("samples.json").then((importedData) => {
        var data = importedData;

        var trace1 = {
            type: 'bar',
            x: data.map(row => row.otu_ids[0]),
            y: data.map(row => row.sample_values[0]),
            orientation: 'h'
        };

        var chartData = [trace1];

    Plotly.newPlot("bar", chartData);

    });

// buildPlot();   