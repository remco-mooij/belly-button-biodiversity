
    d3.json("samples.json").then((importedData) => {
        var data = importedData;
        console.log(data);
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



    Plotly.newPlot("bar", chartData);

    });

// buildPlot();   