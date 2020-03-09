var url = "../data/samples.json";

function buildPlot() {
    d3.json("../data/samples.json").then(function(data) {
        var names = data.names;
        console.log(names);


    });
};

buildPlot();    