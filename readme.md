# ![Assessment 2][banner]

This repository can be forked for [**assessment 2**][a2] of [frontend 3][fe3]
at [**@CMDA**][cmda].

## Metadata

Edit the **description** and **url** of your repository.  Click on edit above
the green Clone or download button and fill in a correct description and use the
`github.io` URL you just set up.

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

---------------------------------------------------------------------------------------------------------------------------

[dataset]: http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82061eng&D1=0&D2=1&D3=0&D4=16,33,50,67,84&LA=EN&HDR=G2&STB=T,G1,G3&VW=T

[voorbeeld]: https://cmda-fe3.github.io/course-17-18/class-4/sort/

[opdracht Interactivity]: https://github.com/cmda-fe3/course-17-18/blob/master/class-4.md

[banner]: https://cdn.rawgit.com/cmda-fe3/logo/a4b0614/banner-assessment-2.svg

[a2]: https://github.com/cmda-fe3/course-17-18/tree/master/assessment-2#description

[fe3]: https://github.com/cmda-fe3

[cmda]: https://github.com/cmda

[pages]: https://pages.github.com
