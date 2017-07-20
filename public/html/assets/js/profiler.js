

	function initApiDocs(){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/apidoc/show",
				crossDomain: true,
				cache:false,
                xhrFields: {
                    withCredentials: false
                },
				beforeSend: function(request){
					request.setRequestHeader('Authorization','Bearer '+window.token.access_token);
				},
				headers:{
					'Content-Type':'application/json',
				},
				dataType:"text json",
				success: function(json) {
				    var out = "<option>None Selected</option>";
                    var count = 1;
					$.each(json, function(key,val){
						$.each(val,function(key2,val2){
                            $.each(val2,function(key3,val3){
                                var path = key2+"/"+key3
                                out += "<option name='"+val3.inputjson+"' value='"+val3.method+"'>"+path+"</option>";
                            });
						});
					});
					document.getElementById("eventType").innerHTML = out;
				},
				error: function(err) {
					console.log("error",err);
				}
			});
	}


	function formatCall(method, path, json){
	    document.getElementById("profilerMethod").value = method;
	    document.getElementById("profilerPath").value = path;
	    document.getElementById("jsonData").value = json;
        document.getElementById("profileCall").style.visibility = 'visible';
	    //var id = getPacketReportId(method, path);
    }


		function callApi(){
		        var method = document.getElementById("profilerMethod").value;
                var path = document.getElementById("profilerPath").value;

                if(method=='GET'){
                    var jsonString = "";
                    var json = (document.getElementById("jsonData")!=null)?JSON.parse(document.getElementById("jsonData").value):null;
                    if(json!=null){
                        $.each(json, function(key,val){
                            var str = key+"="+val+"&";
                            jsonString += str;
                        });
                    }

                    $.ajax({
                        type: 'GET',
                        url: window.url+"/p0.1/"+path+"?"+jsonString,
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer '+window.token.access_token);
                        },
                        headers:{
                            'Content-Type':'application/json'
                        },
                        dataType: 'text json',
                        success: function(json) {
                            console.log(json);
                            if(json){
                                getProfiler(json);
                            }
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.statusText);
                            console.log(jqXHR.status);
                            console.log(jqXHR.getAllResponseHeaders());
                            console.log(textStatus);
                            alert(errorThrown);
                        },
                    });
                }else{
                    var jsonData = document.getElementById("jsonData").value;
                    $.ajax({
                        type: method,
                        url: window.url+"/p0.1/"+path,
                        data: JSON.stringify(jsonData),
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer '+window.token.access_token);
                        },
                        headers:{
                            'Content-Type':'application/json'
                        },
                        dataType: 'text json',
                        success: function(json) {
                            if(json){
                                getProfiler(json);
                            }
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.statusText);
                            console.log(jqXHR.status);
                            console.log(jqXHR.getAllResponseHeaders());
                            console.log(textStatus);
                            alert(errorThrown);
                        },
                    });
                }

    	}


    function getProfiler(json){
        console.log(json);
        var end = 0;
        var parentRow = document.getElementById("profileRow");

        var section = document.createElement("section");

        var div = document.createElement("div");
        div.id = "chartdiv";
        div.style.display='inline-block';

        section.appendChild(div);
        parentRow.appendChild(section);

        //chart.dataProvider = json;
        //chart.validateData();
        var sourceData = [];
        var graphs = [];

        var position;
        var interceptorSegment = [];
        var beforeSegment = [];
        var conSegment = [];
        var afterSegment = [];
        var timeSegment = [];

        var intdata = {"category": "Interceptors[Total]","segments": interceptorSegment};
        var befdata = {"category":"Interceptor[Before]","segments": beforeSegment};
        var condata = {"category":"Controllers","segments": conSegment};
        var aftdata = {"category":"Interceptor[After]","segments":afterSegment};
        var timedata = {"category": "ElapsedTime","segments": timeSegment};

        var beforeTime = [];
        var afterTime = [];
        var taskTime = 0;
        var taskAfter = 0;
        $.each(json, function(key,val){

            console.log(val.loc);

            if(key!='elapsedTime'){
                if(val.loc == 'ProfilerInterceptor/before'){
                    console.log("is before")
                    position = 'before';
                    var tempData = {"start":"0","end":val.time,"task":val.loc};
                    interceptorSegment.push(tempData);
                    beforeTime['start'] = 0;
                    beforeTime['end'] = val.time;
                    end = val.time;
                    afterTime['start'] = val.time;
                }else if(val.loc == 'ProfilerInterceptor/after'){
                    position = 'after';
                    var tempData = {"start":end,"end":val.time+end,"task":val.loc};
                    afterTime['start'] = end;
                    afterTime['end'] = val.time+end;
                    interceptorSegment.push(tempData);
                    end = val.time;
                }
            }else{
                console.log(key);
                var tempData = {"start":0,"end":val,"task":"Total Time"};
                timeSegment.push(tempData);
            }


            if(position=='before' && val.loc != 'ProfilerInterceptor/before'){
                var tempData = {"start":taskTime,"end":val.time+taskTime,"task":val.loc};
                beforeSegment.push(tempData);
                taskTime = val.time+taskTime;
            }
            if(position=='after' && val.loc != 'ProfilerInterceptor/after'){
                taskTime = (taskTime<afterTime['start'])?afterTime['start']:taskTime;
                var tempData = {"start":taskTime,"end":val.time+taskTime,"task":val.loc};
                afterSegment.push(tempData);
                taskTime = val.time+taskTime;
            }
        });

        //sourceData.push(intdata);
        sourceData.push(befdata);
        sourceData.push(aftdata);
        sourceData.push(timedata);


        var chart = AmCharts.makeChart( "chartdiv", {
          "type": "gantt",
          "theme": "light",
          "marginRight": 70,
          "columnWidth": 1,
          "valueAxis": {
            "type": "numeric"
          },
          "brightnessStep": 7,
          "graph": {
            "fillAlphas": 1,
            "lineAlpha": 1,
            "lineColor": "#fff",
            "fillAlphas": 0.85,
            "balloonText": "<b>[[task]]</b>:<br />[[start]] -- [[end]]"
          },
          "rotate": true,
          "categoryField": "category",
          "segmentsField": "segments",
          "colorField": "color",
          "startField": "start",
          "endField": "end",
          "dataProvider": sourceData,
          "valueScrollbar": {
            "autoGridCount": true
          },
          "chartCursor": {
            "cursorColor": "#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha": 1,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable": false,
            "valueZoomable": true
          },
          "export": {
            "enabled": true
          }
        } );

    }


