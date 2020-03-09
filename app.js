
function buildPlot() {
    d3.json("samples.json").then(function(samples) {
        var data = [{
            type: 'bar',
            x: samples.sample_values.map(row => row),
            y: samples.otu_ids.map(row => row),
            orientation: 'h'
        }];

    Plotly.newPlot("bar", data);

    });
};

buildPlot();    