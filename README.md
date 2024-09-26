Cirth Chart Generator
=====================

This is a system for generating charts of characters, arranged visually,
where more similar-looking characters, or those with similar features,
are grouped together.

It is intended for those learning a script, to make it easier and quicker
to find a character and see its phonetic value, equivalence in another script,
or get help in inputting it (a keyboard / key reference).

It was designed for J R R Tolkien's Cirth - runes used by Elves and Dwarves in his
fantasy novels _The Hobbit_ and _The Lord of the Rings_ etc.

In the internal history of the novels, there were different uses of the scripts
at different stages, with different phonetic values and runes being used.
This system therefore allows for multiple versions of the scripts.

Usage
-----

To produce the set of charts, run `node ./main.js` or `npm run generate-svg`

This requires node v17 or later.

The charts will be generated as SVG documents which can be viewed with a web browser
or a vector graphics package like Inkscape.

There is also a web version of the system in `index.html`
To run this you need a web server serving the contents of this folder.
You can do this with the included start script - run `npm start`

This allows you to interactively select the script version, layout (portrait/landscape),
and download the resulting chart.
It also allows you to click on the characters to generate a text,
and copy and paste this elsewhere.

Building Static Site
--------------------

To build the site in a way that allows it to be served from static files, run `npm run build`.
This will create the files in the `_site` subdirectory.

Other ways to serve static files:
* If you have the Python programming language installed, a simple way to do this is:
`python serve-http.py`
* To do this with node, you can run the following command (which may prompt for installation):
`npx http-server`

Deployment to GitHub Pages
--------------------------

There is a custom GitHub action used to deploy to GitHub Pages