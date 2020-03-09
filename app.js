
function buildPlot() {
    d3.json("samples.json").then(function(samples) {
        var data = [{
            type: 'bar',
            x: samples.sample_values,
            y: samples.otu_ids,
            orientation: 'h'
        }];

    Plotly.newPlot("bar", data);

    });
};

buildPlot();    