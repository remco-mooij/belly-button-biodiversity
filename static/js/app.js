
function buildPlot() {
    d3.json("samples.json").then(function(data) {
        var names = samples.names;
        console.log(names);


    });
};

buildPlot();    