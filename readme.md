# ![Assessment 2][banner]

This repository can be forked for [**assessment 2**][a2] of [frontend 3][fe3]
at [**@CMDA**][cmda].

## Metadata

Edit the **description** and **url** of your repository.  Click on edit above
the green Clone or download button and fill in a correct description and use the
`github.io` URL you just set up.

## Process

Voor mijn tweede assessment heb ik de volgende [dataset] gebruikt. De data heb ik vereenvoudigd en vervolgens opgeschoond.

```
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
```
Je houdt dan alleen nog maar de bruikbare elementen over en negeert alles wat overbodig is.

Voor de inter actie heb ik gekeken naar het [voorbeeld] wat stond in de slides en heb ik de [opdracht Interactivity] gebruikt.

```
        // Edited from https://cmda-fe3.github.io/course-17-18/class-4/tip/
    d3.select("input").on("change", onChange);

    var sortTimeout = setTimeout(function() {
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


        svg.selectAll(".bar").sort(function(a, b) {
            return x0(a.year) - x0(b.year);
        });

        var transition = svg.transition().duration(750),
            delay = function(d, i) {
                return i * 0;
            };

        transition.selectAll(".bar").delay(delay).attr("x", function(d) { // Animeerd de bar elementen.
            return x0(d.year);
        });

        transition.select(".axis--x").call(d3.axisBottom(x)).selectAll("g").delay(delay); // The assen worden gesorteerd aan de hand van de data.
    }
```

---------------------------------------------------------------------------------------------------------------------------

## License

Dataset: http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82061eng&D1=0&D2=1&D3=0&D4=16,33,50,67,84&LA=EN&HDR=G2&STB=T,G1,G3&VW=T

Voorbeeld: https://cmda-fe3.github.io/course-17-18/class-4/sort/

Opdracht Interactivity: https://github.com/cmda-fe3/course-17-18/blob/master/class-4.md

---------------------------------------------------------------------------------------------------------------------------
[dataset]: http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82061eng&D1=0&D2=1&D3=0&D4=16,33,50,67,84&LA=EN&HDR=G2&STB=T,G1,G3&VW=T

[voorbeeld]: https://cmda-fe3.github.io/course-17-18/class-4/sort/

[opdracht Interactivity]: https://github.com/cmda-fe3/course-17-18/blob/master/class-4.md

[banner]: https://cdn.rawgit.com/cmda-fe3/logo/a4b0614/banner-assessment-2.svg

[a2]: https://github.com/cmda-fe3/course-17-18/tree/master/assessment-2#description

[fe3]: https://github.com/cmda-fe3

[cmda]: https://github.com/cmda

[pages]: https://pages.github.com
