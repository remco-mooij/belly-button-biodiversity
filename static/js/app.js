
function buildPlot() {
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        console.log(names);


    });
};

buildPlot();    