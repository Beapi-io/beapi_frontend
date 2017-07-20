

	function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  if(date.toString().length==1){ date = '0'+date; }; 
	  var hour = a.getHours();
	  if(hour.toString().length==1){ hour = '0'+hour; };
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + '-' + month + '-' + year + ' ' + hour + ':' + '00' + ':' + '00' ;
	  return time;
	}

	// add row2
	function getLocations(eventName) {
		$.ajax({
			type:'GET',
			url: window.url+"/v0.1/packetReport/getArchiveLocationsByEventAndPacketLossRateDateRange?id="+eventName,
			crossDomain: true,
			cache:false,
			beforeSend: function(request){
				request.setRequestHeader('Authorization','Bearer '+window.token.access_token)
			},
			headers:{
				'Content-Type':'application/json',
			},
		  	dataType:"text json",
		  	success: function(json) {


				var parentRow = document.getElementById("typeRow");

				var childDiv = document.createElement("div");
				childDiv.id='row2';

				var section = document.createElement("section");
				section.className='col-lg-12'; 

			     	var label1 = document.createElement("label");
				label1.className='label';
				label1.innerHTML='Select From/To';

				var label2 = document.createElement("label");
				label2.className='select';

				var select = document.createElement("select");
				select.id='locations';
				// might be 'onchange'
				select.setAttribute("onchange", "getReportData(this)");

				var i = document.createElement("i");


				//var etSelect = document.getElementById("locations");
				etOption = document.createElement("option");
				etOption.text = "None Chosen";
				select.options.add(etOption);
				$.each(json, function(key,val){
					etOption = document.createElement("option");
					etOption.text = val.inputSource+" > "+val.inputDestination;
					etOption.value = val.id;
					select.options.add(etOption);
				});

				label2.appendChild(select);
				label2.appendChild(i);

				section.appendChild(label1);
				section.appendChild(label2);
				
				childDiv.appendChild(section);

				parentRow.appendChild(childDiv);

				//var lrow = document.getElementById("locationsRow")
				//lrow.style.visibility='visible';
		
		  	},
           error: function (request, status, error) {
            	console.log(request.status);
                console.log(request.responseText);
            },
		});
	};

	// add row3
	function getReportData(elem) {
		$.ajax({
			type:'GET',
			url: window.url+"/v0.1/packetLossRate/listByPacketReport?id="+elem.value,
			crossDomain: true,
			cache:false,
			xhrFields: {
				withCredentials: false
			},
			beforeSend: function(request){
				request.setRequestHeader('Authorization','Bearer '+window.token.access_token)
			},
			headers:{
				'Content-Type':'application/json',
			},
		  	dataType:"text json",
		  	success: function(json) {
				var parentRow = document.getElementById("row2");

				var section = document.createElement("section");

				var div = document.createElement("div");
				div.id = "chartdiv";
				div.style.display='inline-block';

				section.appendChild(div);
				parentRow.appendChild(section);

				//chart.dataProvider = json;
				//chart.validateData();
				var tempArray = new Array();
				$.each(json, function(key,val){
					var obj = new Object();

					obj.date = timeConverter(val.xAxis);
					obj.value = val.yAxis;

					tempArray.push(obj);
				});

				var chart = AmCharts.makeChart( "chartdiv", {
				  "type": "serial",
				  "theme": "light",
				  "marginRight": 40,
				  "marginLeft": 40,
				  "autoMarginOffset": 20,
				  "dataDateFormat": "DD/MM/YYYY JJ:NN",
				  "valueAxes": [ {
				    "id": "v1",
				    "axisAlpha": 0,
				    "position": "left"
				  } ],
				  "balloon": {
				    "borderThickness": 1,
				    "shadowAlpha": 0
				  },
				  "graphs": [ {
				    "id": "g1",
				    "balloon": {
				      "drop": true,
				      "adjustBorderColor": false,
				      "color": "#ffffff",
				      "type": "smoothedLine"
				    },
				    "fillAlphas": 0.2,
				    "bullet": "round",
				    "bulletBorderAlpha": 1,
				    "bulletColor": "#FFFFFF",
				    "bulletSize": 5,
				    "hideBulletsCount": 50,
				    "lineThickness": 2,
				    "title": "red line",
				    "useLineColorForBulletBorder": true,
				    "valueField": "value",
				    "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
				  } ],
				"chartScrollbar":{
					"graphType":"column"
				},
				  "chartCursor": {
				    "valueLineEnabled": true,
				    "valueLineBalloonEnabled": true,
				    "cursorAlpha": 0,
				    "zoomable": true,
				    "valueLineAlpha": 0.5,
				  },
				  "categoryField": "date",
				  "categoryAxis": {
				    "parseDates": true,
				    "minPeriod": "mm",
				    "dashLength": 1,
				    "minorGridEnabled": true,
				    "labelRotation": 45
				  },
				  "export": {
				    "enabled": true
				  },
				  "dataProvider": tempArray
				} );

				chart.dataProvider = tempArray;

		  	},
           error: function (request, status, error) {
            	console.log(request.status);
                console.log(request.responseText);
            },
		});
	};

