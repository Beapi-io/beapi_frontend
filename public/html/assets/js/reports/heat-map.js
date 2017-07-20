

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
	function getReportData(elem) {
		$.ajax({
			type:'GET',
			url: window.url+"/v0.1/packetLossRate/listByPacketReportforHeatMap?id="+elem.value,
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
				var sourceData = [];
				var dataPoint = [];
				var graphs = [];
				var dows = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
				var currentWeek = null;
				var currentDay = 1;
				var dataPoint = [];
				var weeks = json.values.weekCnt;

				// init sourcedata first
				for (var i = 0; i < dows.length; i++) {
					var dataPoint = {
						dow: dows[i]
					}

					// generate value for each hour
					for (var h = 0; h <= weeks.length; h++) {
						dataPoint['value' + h] = 0;
						dataPoint['color' + h] = '#ffffff';
						dataPoint['week' + h] = 1;
					}
					sourceData.push(dataPoint);
				}

				for (var h = 0; h <= weeks.length; h++) {
					graphs.push({
					    "balloonText": "Original value: [[value" + h + "]]",
					    "fillAlphas": 1,
					    "lineAlpha": 0,
					    "type": "column",
					    "colorField": "color" + h,
					    "valueField": "week" + h
					});
				}

				$.each(json.values, function(key,val){
					if(key!='weekCnt'){
						if(val.woy>currentWeek || currentWeek==null){ 
							currentWeek=weeks.indexOf(val.woy);
						}

						var inc = weeks.indexOf(currentWeek)+1;
						if(typeof sourceData[val.dow]==="undefined"){
							var dPoint = { dow: dows[val.dow-1] }
							//dPoint['value' + currentWeek] = currentWeek+"<br>"+val.highest+"<br>"+timeConverter(key);
							dPoint['value' + currentWeek] = currentWeek+"<br>"+val.highest+"<br>"+timeConverter(key)
							dPoint['color' + currentWeek] = val.color;
							dPoint['week' + currentWeek] = 1;
							sourceData.push(dPoint);
						}else{
							//sourceData[val.dow]['value' + inc] = currentWeek+"<br>"+val.highest+"<br>"+timeConverter(key);
							sourceData[val.dow]['value' + currentWeek] = currentWeek+"<br>"+val.highest+"<br>"+timeConverter(key)
							sourceData[val.dow]['color' + currentWeek] = val.color;
							sourceData[val.dow]['week' + currentWeek] = 1;
						}
					}

				});

				var chart = AmCharts.makeChart("chartdiv", {
				  "type": "serial",
				  "dataProvider": sourceData,
				  "valueAxes": [{
				    "stackType": "regular",
				    "axisAlpha": 0.3,
				    "gridAlpha": 0,
				    "maximum": weeks.length,
				    "unit":"week"
				  }],
				  "graphs": graphs,
				  "columnWidth": 1,
				  "categoryField": "dow",
				  "categoryAxis": {
				    "parseDates": false,
				    "gridPosition": "start",
				    "axisAlpha": 0,
				    "gridAlpha": 0,
				    "position": "left",
				    "labelRotation": 45
				  }
				});

				//chart.dataProvider = sourceData;
				//chart.graphs = graphs;

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

