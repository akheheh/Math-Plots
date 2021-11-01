//use the math lhs to use the math.js library

//Too lazy to type Math.PI so frequently
const pi = Math.PI;

//Store time as a closure
const tInc = () => {
    let t = 0.1;
    return () => {
        while(t > 0) {
            t += 0.001;
            return t;
        }
    }
};

//Use closure to animate over time
let t = tInc();

//expGen stores our mathematical expressions as strings for math.js to interpret
const expGen = (k) => `(1)/${math.sqrt(4*pi*k*t())}e^((-x^2)/${4*k*t()})`;

//Various materials listed as conductivity coefficients
const materials = [0.1, 0.3, 0.5, 0.9];

//Big 'ole method which will be called over an interval and re-draw curves based on time evolution
const plotFoo = () => {
    //functions to plot
    //Map a string expression for each material coefficient k
    const expressions = materials.map(material => expGen(material));

    //Generate functions JavaScript can interpret by evaluating the string expressions
    const functions = expressions.map(expression => math.compile(expression));
    //Evaluate the functions over the range -2 to 2, with smoothness of 0.01 (lower values => smoother curves)
    //Store xvalues as an array.
    const xValues = math.range(-2, 2, 0.01).toArray();

    //Generate an array of y values (also an array) for each generated function
    const yValues = functions.map(foo => {
        return xValues.map((x) => {
            return foo.eval({x: x})
        })
    });
    
    //Generate graph data for each yValue array
    const mapData = yValues.map((y, i) => {
        return {
            x: xValues,
            y: y,
            type: 'scatter',
            name: `Material with k = ${materials[i]}`
        }
    })
    
    //Compress data into one variable
    const data = mapData;

    //Some configurations for our graphs (also called layout)
    const config = {
        title: "Solution to the 1D heat equation for various materials with time-evolution",
        
        font: {
            size: 20
        },

        margin: {
            t: 60
        },

        xaxis: {
            autotick: false,
            ticks: "inside",
            tick0: 0,
            ticklen: 5,
            dtick: 0.25,
            tickwidth: 1,
            range: [-1, 1]
        },

        yaxis: {
            autotick: false,
            ticks: "inside",
            tick0: 0,
            ticklen: 5,
            dtick: 0.25,
            tickwidth: 1,
            range: [0, 3]
        },

        legend: {
            margin: {
                t: 30
            },

            font: {
                size: 16
            }
        }
    }

    //Render plot(s) in the .plot DOM element
    const PlotContainer = document.querySelector(".plot");
    
    //Plot our data in our DOM, with our data, configs, and using Plotly's responsiveness
    Plotly.newPlot(PlotContainer, data, config, {responsive: true});
};

//Generate initial static plots of solutions
const plotInitial = plotFoo();

//Re-render solution curves by calling our plotting method and using an interval to animate changes of time t
const plotSolutionEvolve = setInterval(plotFoo, 50);

//End animation after 20 seconds.
setTimeout(() => {
    clearInterval(plotSolutionEvolve)
}, 20000);
