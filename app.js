
    d3.json("samples.json").then((importedData) => {
        var data = importedData;
        var samples = data.samples;
        var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
        var result = resultArray[0];
        console.log(result);
        // var xValues = data.map(row => row.samples.otu_ids);
        // var yValues = data.map(row => row.samples.sample_values);
        var xValues = result.otu_ids;
        var yValues = result.sample_values;
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