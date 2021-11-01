//use the math lhs to use the math.js library
//console.log(math.sqrt(-4).toString());
const k = 0.5;
const pi = Math.PI;
const tInc = () => {
    let t = 0.1;
    return () => {
        while(t > 0) {
            t += 0.001;
            return t;
        }
    }
};
let t = tInc();
const expGen = (k) => `(1)/${math.sqrt(4*pi*k*t())}e^((-x^2)/${4*k*t()})`;
const plotFoo = () => {

    //functions to plot
    const expFoo1 = expGen(0.1);
    const expFoo2 = expGen(0.3);
    const expFoo3 = expGen(0.5);
    const expFoo4 = expGen(0.9);
    //Compiling the symbolic expression to something math.js can work with
    const expression1 = math.compile(expFoo1);
    const expression2 = math.compile(expFoo2);
    const expression3 = math.compile(expFoo3);
    const expression4 = math.compile(expFoo4);
    //console.log(expression);
    const xValues = math.range(-2, 2, 0.01).toArray();
    const yValues1 = xValues.map((x) => {
        return expression1.eval({x: x});
    });
    const yValues2 = xValues.map((x) => {
        return expression2.eval({x: x});
    });
    const yValues3 = xValues.map((x) => {
        return expression3.eval({x: x});
    });
    const yValues4 = xValues.map((x) => {
        return expression4.eval({x: x});
    });

    const material1 = {
        x: xValues,
        y: yValues1,
        type: 'scatter',
        name: "Material with k = 0.1 W/mk"
    };

    const material2 = {
        x: xValues,
        y: yValues2,
        type: 'scatter',
        name: "Material with k = 0.3 W/mk"
    };

    const material3 = {
        x: xValues,
        y: yValues3,
        type: 'scatter',
        name: "Material with k = 0.5 W/mk"
    };

    const material4 = {
        x: xValues,
        y: yValues4,
        type: 'scatter',
        name: "Material with k = 0.9 W/mk"
    }
    //console.log(math.exp(1));
    const data = [material1, material2, material3, material4];

    const config = {
        title: "Solution to the 1D heat equation for various materials with time-evolution",
        
        font: {
            size: 20
        },

        margin: {
            t: 50,
            b: 20
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
    const PlotContainer = document.querySelector(".plot");
    Plotly.newPlot(PlotContainer, data, config, {responsive: true});
};

const plotInitial = plotFoo();
const plotSolutionEvolve = setInterval(plotFoo, 50);

setTimeout(() => {
    clearInterval(plotSolutionEvolve)
}, 20000);
//newPlot(dom, data, config?)
