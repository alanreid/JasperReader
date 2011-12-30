# JasperReader v0.1
A simple jQuery Plugin to render JasperReports files in a Web browser.
#### Note: This is experimental. It's still very buggy and definitely NOT ready for production.


## Requirements
* jQuery (www.jquery.com)
* XML2JSON Library by Fyneworks (www.fyneworks.com)
* Raphaël (www.raphaeljs.com)


## Installation
1) Add the required libraries:

    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery.xml2json.js"></script>
    <script type="text/javascript" src="raphael.js"></script>
    <script type="text/javascript" src="jquery.jasperreader.js"></script>

2) And bind the reader to an existing DOM element: 

    element.JasperReader(<filename>, <sections>);
The second parameter is a list of sections and it's optional. Renders all sections by default.

### Example: 
    <script type="text/javascript">	
    $(function() {
    	$('#report').JasperReader('report.jrxml', [ 'title', 'pageHeader', 'detail', 'pageFooter' ]);
    });
    </script>

## TODO
* Fix alignment issues.
* Add support for more components.
* Add support for parameters (would be nice to be able to supply a data source, too)


## Future:
* It would be nice to add a designer feature with drag & drop and change tracking.


