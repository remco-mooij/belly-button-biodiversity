// Add ID numbers to dropdown menu and build initial dashboard
function init() {
    d3.json("samples.json").then((importedData) => {
        var names = importedData.names;
        var dropdownList = d3.select("#selDataset");

        names.forEach(function(name) {
            dropdownList.append("option")
            .text(`${name}`);
        });

        // Call buildData() function to build initial dashboard
        buildData();
    });
};

init();

// Call buildData() function when user select an ID number from dropdown menu
d3.selectAll("#selDataset").on("change", buildData);

function buildData() {
    var selection = d3.select("#selDataset").property("value");
    console.log(selection);

    d3.json("samples.json").then((importedData) => {
        var samples = importedData.samples;
        var resultArray = samples.filter(sampleObject => sampleObject.id == selection);
        var result = resultArray[0];
          
        var sampleValues = result.sample_values;
        var otuIds = result.otu_ids;
        var otuLabels = result.otu_labels;
        
        var xTopTen = sampleValues.slice(0, 10).reverse();
        var yTopTen = otuIds.slice(0, 10).reverse();
        var hoverTopTen = otuLabels.slice(0, 10).reverse();

        console.log(xTopTen);
        console.log(yTopTen);
        console.log(hoverTopTen);

        otuArray = [];
        yTopTen.forEach(function(id) {
            var otuName = `OTU ${id}`;
            otuArray.push(otuName);
        });
        console.log(otuArray);

        // Build charts
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
            xaxis: {
                autorange: true,
            },
            hoverlabel: {
                bgcolor: "#812305",
                font: {color: "white"}
            }
        };

        var bubbleChart = [{
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
            xaxis: {
                title: "OTU ID"
            }
        };

    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);
    Plotly.newPlot("bar", barChart, barLayout);

    // Call displayMetadata() function to display demographic info 
    displayMetadata();

    });
};

function displayMetadata() {
    d3.json("samples.json").then((importedData) => {
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
    
   
    
