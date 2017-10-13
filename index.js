var svg = d3.select("svg"), // Geeft de SVG vorm.
    margin = {
        top: 20,      // Geeft waarde aan margin.
        right: 20,
        bottom: 30,
        left: 40
    },
    width = +svg.attr("width") - margin.left - margin.right, // Stelt de waardes van margin left en right in als de width.
    height = +svg.attr("height") - margin.top - margin.bottom; // Stelt de waardes van margin top en bottom in als de height.

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.text('hotel.csv') // Laadt de .csv in.
    .get(onload)

function onload(err, doc) {
    if (err) throw err;

    var header = doc.indexOf('"Subjects_1";"Country of residence";"Periods";"Regions";"Nederland"') //haalt alles uit de .csv tot de data.
    var end = doc.indexOf('\n', header) // Stopt de header en alle enters in 1 element.
    doc = doc.slice(end).trim() // Haalt alle elementen in de variable "end" weg.

    var data = d3.csvParseRows(doc, map)
    data.pop() // Haalt het laatste object uit de array.

    function map(d) {
        if (d[1] == "." || d[2] == NaN) { // Controleerd of de waarde "." is of "NaN".
            return
        }
        return {
            year: d[2], // Geeft ID "year".
            value: Number(d[4]) // maakt een nummer van een string.
        }
    }

    x.domain(data.map(function(d) {
        return d.year;
    }));

    y.domain([0, d3.max(data, function(d) {
        return d.value;
    })]);

    g.append("g") // Maakt de X-as aan.
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g") // Maakt de Y-as aan.
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10)) //Geeft aan de er 10 waardens langs de Y-as staan.
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");

    g.selectAll(".bar") // Maakt de bar elementen van de grafiek.
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.year);
        })
        .attr("y", function(d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
            return height - y(d.value);
        });
        // Edited from https://cmda-fe3.github.io/course-17-18/class-4/tip/ en geholpen door Dorus ten Haaf: https://github.com/dorusth/fe3-assessment-2
    d3.select("input").on("change", onChange);

    var sortTimeout = setTimeout(function() { // Controleerd of het hokje gechecked is.
        d3.select("input").property("checked", false).each(onChange);
    }, 0);

    function onChange() {
        clearTimeout(sortTimeout);
        var x0 = x.domain(data.sort(this.checked ?

            function(a, b) { // Als het hokje gechecked is dat wordt de data gesorteerd.
                return b.value - a.value;
            } :
            function(a, b) {
                return d3.ascending(a.year, b.year);
            }).map(function(d) {
            return d.year;
        })).copy();


        svg.selectAll(".bar").sort(function(a, b) { // selecteerd all bars en sorteerd ze.
            return x0(a.year) - x0(b.year);
        });

        var transition = svg.transition().duration(750), // specificeerd de animatie.
            delay = function(d, i) {
                return i * 0;
            };

        transition.selectAll(".bar").delay(delay).attr("x", function(d) { // Voegt de animatie toe aan de bar elementen.
            return x0(d.year);
        });

        transition.select(".axis--x").call(d3.axisBottom(x)).selectAll("g").delay(delay); // The assen worden gesorteerd aan de hand van de data.
    }
};
