
function buildPlot() {
    d3.json("samples.json").then(function(samples) {
        var data = [{
            type: 'bar',
            x: samples.sample_values.map(row => row[0]),
            y: samples.otu_ids.map(row => row[0]),
            orientation: 'h'
        }];

    Plotly.newPlot("bar", data);

    });
};

buildPlot();    