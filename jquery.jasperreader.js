(function($) {
	$.fn.JasperReader = function(url, sections) {
		
		if(typeof url == 'undefined') {
			console.error('Please specify a JasperReports XML file.');
			return;
		}
		
		var container = $(this);
		var report = {};
		var canvas = {};
		
		var fetchPage = function(url, callback) {
			$.ajax({
				type: 'GET',
				url: url, 
				dataType: 'xml',
				complete: function(response) {
					callback($.xml2json(response.responseText));
				}
			});	
		};
		
		var createPage = function() { 
			container.css({
				width: 		report.pageWidth, 
				height: 	report.pageHeight,
				padding: 	report.topMargin + 'px ' + 
							report.rightMargin + 'px ' + 
							report.bottomMargin + 'px ' + 
							report.leftMargin + 'px'
			});
			
			canvas = Raphael(container.attr('id'));
			
			Draw.draw();
			
			container.before('<h1>' + report.name + '</h1>');
		};
		
		var Draw = {
			
			sections: [],
			
			setSections: function(obj) {
				
				if(typeof obj == 'undefined') {
					var obj = [];
					for(i in report) {
						if(typeof report[i] == 'object') {
							obj.push(i);
						}
					} 
				}

				this.sections = obj;
			},
			
			exists: function(str) {
				if(typeof this[str] != 'undefined') {
					return true;
				}
				
				return false;
			},
			
			draw: function() { 
				var currentTop = parseInt(report.topMargin);
				var currentLeft = parseInt(report.leftMargin);
				
				for(i in this.sections) { 
					var section = this.sections[i];

					for(band in report[section]) {
						for(name in report[section][band]) {
							if(this.exists(name)) { 
								if(report[section][band][name].length > 0) {
									for(i in report[section][band][name]) {
										report[section][band][name][i].reportElement.x = parseInt(report[section][band][name][i].reportElement.x) + currentLeft;
										report[section][band][name][i].reportElement.y = parseInt(report[section][band][name][i].reportElement.y) + currentTop;
										this[name](report[section][band][name][i]);
									}
								} else {
									report[section][band][name].reportElement.x = parseInt(report[section][band][name].reportElement.x) + currentLeft;
									report[section][band][name].reportElement.y = parseInt(report[section][band][name].reportElement.y) + currentTop;
									this[name](report[section][band][name]);
								}
							} 
						}
						
						currentTop += parseInt(report[section][band].height);
					}
					
				}
			},
			
			rectangle: function(e) { 
				var rect = canvas.rect(
					e.reportElement.x, 
					e.reportElement.y, 
					e.reportElement.width, 
					e.reportElement.height
				);
				rect.attr("fill", e.reportElement.backcolor);
				rect.attr("stroke", "#CCC");
			},
			
			line: function(e) {
				this.rectangle(e);
			},
			
			staticText: function(e) { 
				
				var text = canvas.text(e.reportElement.x, e.reportElement.y, e.text[0]);

				text.attr("fill", e.forecolor);
				text.attr("textAlign", e.textElement.textAlignment);
				text.attr("font", e.textElement.font.size + "px Arial");
				text.attr("text-anchor", "start");
				
				if(e.textElement.font.isBold) {
					text.attr("font-weight", "bold");  
				}
			},
			
			textField: function(e) { 
				var text = canvas.text(e.reportElement.x, e.reportElement.y, e.textFieldExpression);
				
				text.attr("fill", "#DDD");
				text.attr("text-anchor", "start");
				text.attr("textAlign", e.textElement.textAlignment);
				text.attr("font", e.textElement.font.size + "px Arial");
			}
		};
		
		
		
		fetchPage(url, function(xml) {
			report = xml;
			
			Draw.setSections(sections);
			
			createPage();
		});
		
	};
})(jQuery);