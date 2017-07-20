

	var packet_trace_title = "";

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
	  var time = month + '/' + date;
	  return time;
	}

	// add row2
	function getLocations(eventName) {
		$.ajax({
			type:'GET',
			url: window.url+"/v0.1/packetRetransmitSub/getArchiveLocationsByEvent?id="+eventName,
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
           error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.statusText =='abort') { return; }
                console.log(jqXHR.status);
                //console.log(jqXHR.getAllResponseHeaders());
                console.log(textStatus);
                alert(jqXHR.responseText);
            },
		});
	};

	// add row3
	function getReportData(elem){
		$.ajax({
			type:'GET',
			url: window.url+"/v0.1/packetRetransmitSub/listByPacketReport?id="+elem.value,
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

				var tempArray = new Array();
				$.each(json, function(key,val){

					$.each(val, function(key2,val2){
					    var obj = new Object();
                        obj.time = key2;
                        obj.count = val2;
                        tempArray.push(obj);
					})
				});
				tempArray.sort(function(a, b) {
				  return +(a.value > b.value) || +(a.value === b.value) - 1;
				});


				var chart = AmCharts.makeChart( "chartdiv", {
				  "type": "serial",
				  "theme": "light",
				  "dataProvider": tempArray,
				  "valueAxes": [ {
				    "gridColor": "#FFFFFF",
				    "gridAlpha": 0.2,
				    "dashLength": 0
				  } ],
				  "gridAboveGraphs": true,
				  "startDuration": 1,
				  "graphs": [ {
				    "balloonText": "[[category]]: <b>[[value]]</b>",
				    "fillAlphas": 0.8,
				    "lineAlpha": 0.2,
				    "type": "column",
				    "valueField": "count"
				  } ],
				  "chartCursor": {
				    "categoryBalloonEnabled": false,
				    "cursorAlpha": 0,
				    "zoomable": false
				  },
				  "categoryField": "time",
				  "categoryAxis": {
				    "gridPosition": "start",
				    "gridAlpha": 0,
				    "tickPosition": "start",
				    "tickLength": 20,
				    "labelRotation": 45
				  },
				  "export": {
				    "enabled": true
				  }

				} );
			},
           error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.statusText =='abort') { return; }
                console.log(jqXHR.status);
                //console.log(jqXHR.getAllResponseHeaders());
                console.log(textStatus);
                alert(jqXHR.responseText);
            },
		});
	}


