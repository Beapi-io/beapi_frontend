	function initEvents(id){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/eventType/list",
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
				    var out = "";
                    out += "    <form method='post' id='sky-form3' class='sky-form'>";
                    out += "        <header>Event Types</header>";

                    out += "        <fieldset>";
                    out += "            <div class='row' id='typeRow'>";
                    out += "                <section class='col-lg-12'>";
                    out += "                    <label class='label'>Select an Event Type</label>";
                    out += "                    <select id='eventType' onChange='getReports(this.value,this.options[this.selectedIndex].text)'>";
                    out += "                    <option>None Chosen</option>";
                    out += "                    <option value='8'>heat-map</option>";

					$.each(json, function(key,val){

					    if(id==val.id){
					        out += "<option value='"+val.id+"' selected>"+val.name+"</option>";
					    }else{
                    	    out += "<option value='"+val.id+"'>"+val.name+"</option>";
                    	}
					});
					out += "            </select>";
					out += "					<i></i>";
					out += "				</label>";
					out += "			</section>";
					out += "		</div>";
					out += "	</fieldset>";
					out += "</form>";

					document.getElementById("eventTypes").innerHTML = out;
                    var element = document.getElementById('eventType');
                    element.value = id;
                    getReports(id,element.options[element.selectedIndex].text);

				},
				error: function(err) {
					console.log("error",err);
				}
			});
	}

	function getReports(id,text) {
		switch(text){
			case 'heat-map':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/heat-map.js', reports, document.body);
				break;
			case 'time-error-estimates':
				//url is URL of external file, implementationCode is the code
				//to be called from the file, location is the location to
				//insert the <script> element
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/time-error-estimates.js', reports, document.body);
				break;
			case 'packet-duplicates':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-duplicates.js', reports, document.body);
				break;
			case 'histogram-ttl':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-duplicates.js', reports, document.body);
				break;
			case 'packet-count-sent':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-count-sent.js', reports, document.body);
				break;
			case 'packet-count-lost':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-count-lost.js', reports, document.body);
				break;
			case 'histogram-owdelay':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/histogram-owdelay.js', reports, document.body);
				break;
			case 'failures':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/failures.js', reports, document.body);
				break;
			case 'packet-loss-rate':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-loss-rate.js', reports, document.body);
				break;
			case 'packet-trace':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-trace.js', reports, document.body);
				break;
			case 'path-mtu':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/path-mtu.js', reports, document.body);
				break;
			case 'throughput-subintervals':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/throughput-subintervals.js', reports, document.body);
				break;
			case 'packet-retransmits':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-retransmit.js', reports, document.body);
				break;
			case 'throughput':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/throughput.js', reports, document.body);
				break;
			case 'packet-retransmits-subintervals':
				var loadJS = function(url, implementationCode, location){
				    var scriptTag = document.createElement('script');
				    scriptTag.src = url;

				    scriptTag.onload = implementationCode;
				    scriptTag.onreadystatechange = implementationCode;

				    location.appendChild(scriptTag);
				};
				var reports = function(){
					clearAll();
					getLocations(id);
				}
				loadJS('/assets/js/reports/packet-retransmits-subintervals.js', reports, document.body);
				break;
			default:
				break;
		}
	};

	function clearAll(){
		var elem1 = document.getElementById("row2");
		if(elem1!=null){ elem1.parentNode.removeChild(elem1); }

		var elem2 = document.getElementById("row3");
		if(elem2!=null){ elem2.parentNode.removeChild(elem2); }

		var elem3 = document.getElementById("row4");
		if(elem3!=null){ elem3.parentNode.removeChild(elem3); }

		var elem4 =document.getElementById("row5");
		if(elem4!=null){elem4.parentNode.removeChild(elem4); }
	}