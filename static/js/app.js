//Use the D3 Library to read in the samples.json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use init function
function init() {

    // Use D3 for the dropdown select element
    const selector = d3.select("#selDataset");

// Fetch the JSON data and fill the select options
d3.json(url).then((data) => {
    const sampleNames = data.names;

    //Set up an array of id names
    let names = data.names;

    names.forEach((sample) => {
        //Append each name as an option in the dropdown menu
        //Add the name to the file as an option element
        selector.append("option").text(sample).property("value", sample);
    });

    //Assign the first name to the name variable
    let fname = names[0];

    //Call the functions needed for the charts
    demo(fname);
    bar(fname);
    bubble(fname);

  });
}

//Initialize the dashboard
init();

//Create the bar chart
function bar(selectedvalue) {
    //Pull the json data
    d3.json("samples.json").then((data) => {
        console.log('Data: ${data}');

        //Create an array of sample objects
        let samples = data.samples;

        //Filter the data where id = selected value
        let filteredData = samples.filter((sample) => sample.id === selectedvalue);

        //Assign the first object to the object variable
        let object = filteredData[0];

        //Trace the data for the horizontal bar chart
        let trace = [{
            //Slice the top 10 OTUs
            x: object.sample_values.slice(0,10).reverse(),
            y: object.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: object.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        //Use Plotly to create the bar chart
        Plotly.newPlot("bar", trace);
    });
}

//Create the bubble chart
function bubble(selectedvalue) {
    //Pull the json data
    d3.json("samples.json").then((data) => {
        console.log('Data: ${data}');

        //Create an array of sample objects
        let samples = data.samples;

        //Filter the data where id = selected value
        let filteredData = samples.filter((sample) => sample.id === selectedvalue);

        //Assign the first object to the object variable
        let object = filteredData[0];

        //Trace the data for the horizontal bar chart
        let trace = [{
            //Slice the top 10 OTUs
            y: object.sample_values,
            x: object.otu_ids,
            text: object.otu_labels,
            mode: "markers",
            marker: {
                color: object.otu_ids,
                size: object.sample_values,
                colorscale: "Earth"
            },
        
        }];

        //Use Plotly to create the bar chart
        Plotly.newPlot("bubble", trace);
    });
}

//Create Change Data function
function optionChanged (newSample){
    bar (newSample)
    bubble (newSample)
    demo (newSample)
}

//Create Demographic Data

function demo (selectedvalue) {
    d3.json("samples.json").then((data) => {
        console.log('Data: ${data}');

        //Create an array of sample objects
        let metaData = data.metadata;
        console.log (metaData)
        //Filter the data where id = selected value
        let filteredData = metaData.filter((metadata) => metadata.id == selectedvalue);

        //Assign the first object to the object variable
        let object = filteredData[0];
        console.log (object);
        const pane = d3.select("#sample-metadata");
        pane.html("")

        for (key in object){
            pane.append("h6").text(key.toUpperCase()+": "+object[key])
        }



    })
}
