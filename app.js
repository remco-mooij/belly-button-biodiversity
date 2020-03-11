
function buildPlot(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var plot = [{
            type: 'bar',
            x: otu_labels,
            y: otu_ids,
            orientation: 'h'
        }];

    Plotly.newPlot("bar", plot);

    });
};

buildPlot();    