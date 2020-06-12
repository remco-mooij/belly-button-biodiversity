// add ID numbers to dropdown menu and build initial dashboard
function init() {
    d3.json("static/resources/samples.json").then((importedData) => {
        var names = importedData.names;
        var dropdownList = d3.select("#selDataset");

        names.forEach(function(name) {
            dropdownList.append("option")
            .text(`${name}`);
        });

        
        buildData();
    });
};

init();

// call buildData() function when user select an ID number from dropdown menu
d3.selectAll("#selDataset").on("change", buildData);

function buildData() {
    var selection = d3.select("#selDataset").property("value");
    console.log(selection);

    d3.json("static/resources/samples.json").then((importedData) => {
        // get washing frequency value for gauge chart
        var metaData = importedData.metadata;
        var metaDataObject = metaData.filter(sampleObject => sampleObject.id == selection);
        var metaDataValues = metaDataObject[0];
        var washingFreq = metaDataValues.wfreq;
        
        // get sample values filtered on selection
        var samples = importedData.samples;
        var resultArray = samples.filter(sampleObject => sampleObject.id == selection);
        var result = resultArray[0];
          
        var sampleValues = result.sample_values;
        var otuIds = result.otu_ids;
        var otuLabels = result.otu_labels;
        
        var xTopTen = sampleValues.slice(0, 10).reverse();
        var yTopTen = otuIds.slice(0, 10).reverse();
        var hoverTopTen = otuLabels.slice(0, 10).reverse();
        
        // create array of labels for y-axis of bar chart 
        otuArray = [];
        yTopTen.forEach(function(id) {
            var otuName = `OTU ${id}`;
            otuArray.push(otuName);
        });
        console.log(otuArray);

        // build charts

        // bar chart
        var barChart = [{
            type: 'bar',
            x: xTopTen,
            y: otuArray,
            orientation: 'h',
            text: hoverTopTen
        }];

        var barLayout = {
            width: 400,
            height: 600,
            margin: {'t': 0},
            xaxis: {
                autorange: true,
            },
            hoverlabel: {
                bgcolor: "#812305",
                font: {color: "white"}
            }
        };

        // bubble chart
        var bubbleChart = [{
            type: 'scatter',
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            text: otuLabels,
            marker: {
                size: sampleValues,
                color: otuIds
            }
        }];

        var bubbleLayout = {
            xaxis: {title: "OTU ID", autorange: true},
            yaxis: {range: [Math.min(sampleValues), Math.max(sampleValues)],
                    mode: 'linear'},
            margin: {t: 0, pad: 0}
        };

        // gauge chart
        // meter point settings
        var level = washingFreq;
        var degrees = 9 - level, radius = .5;
        var radians = degrees * Math.PI / 9.5;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        var mainPath = 'M -.03 -0.025 L .03 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        // chart properties
        var gaugeChart = [{ type: 'scatter',
            x: [0], y:[0],
                marker: {size: 40, color:'850000'},
                showlegend: false,
                name: 'frequency',
                text: level,               
                hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            direction: 'clockwise',
            rotation: 90,
            text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ' '],
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:['F5F8EF', 'E8EEDA',
            'E0E5BD', 'D1E6A8',
            'C1DC8B', 'AEC28E',
            '8BBD7C', '70A170', '638A61', 'white']},
            labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ' '],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
            }];

            var gaugeLayout = {
            shapes:[{
                type: 'path',
                path: path,
                margin: {l: 0, r: 0, b: 0, t: 0, pad: 0},
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
                }],
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
            height: 600,
            width: 600,
            xaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]},
            yaxis: {zeroline:false, showticklabels:false,
                        showgrid: false, range: [-1, 1]}
            };
    
    Plotly.newPlot("gauge", gaugeChart, gaugeLayout, {displayModeBar: false});
    Plotly.newPlot("bubble", bubbleChart, bubbleLayout, {displayModeBar: false});
    Plotly.newPlot("bar", barChart, barLayout, {displayModeBar: false});

    displayMetadata();

    });
};

// display demographic info
function displayMetadata() {
    d3.json("static/resources/samples.json").then((importedData) => {
        var metaData = importedData.metadata
        var selection = d3.select("#selDataset").property("value");
    
        d3.select("#sample-metadata").selectAll("p").remove();
        var metaDataObject = metaData.filter(sampleObject => sampleObject.id == selection);
        console.log(metaDataObject);
        var metaDataValues = metaDataObject[0];
    
        Object.entries(metaDataValues).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
            d3.select("#sample-metadata")
            .append("p")
            .text(`${key}: ${value}`);
        }); 
    });
};
    
   
    
