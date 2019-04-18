    function initApiDocs(){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/apidoc/show",
				crossDomain: true,
                cache:false,
                async:true,
                contentType: 'application/json',
                xhrFields:{
                    withCredentials: false
                },
				beforeSend: function(request){
					request.setRequestHeader('Authorization','Bearer '+window.token.access_token);
				},
				headers:{
					'Content-Type':'application/json'
				},
				dataType:"text json",
				success: function(json) {
				    var out = "";
                    var count = 1;
                    if(json){
					$.each(json, function(key,val){

					    document.getElementById("apidocs").innerHTML = null

						$.each(val, function(key2,val2){

                            var controller = key2;


							out += `<header style='font-weight:bold;font-size: 16px;'>`+key2.toUpperCase()+`</header>
                                    <div class='panel-group acc-v1' id='accordion-"+count+"'>`;
							$.each(val2,function(key3,val3){
                            var action = key3;
                            var tempPath = val3.path.split("/");
                            var path = tempPath[2]+"/"+tempPath[3];
							    // MATCH HOOKROLE AUTHORITIES
							    var hookRoleExists=false;
							    var token = localStorage.getItem('orp_token');
							    var json = JSON.parse(token);
                                if(token!=null){

                                    function testAuths(item,index){
                                        if(hookRoleExists==false){if($.inArray(item,json.authorities)>=0){hookRoleExists=true}};
                                    }

                                    if(val3.hookRoles){
                                        val3.hookRoles.forEach(testAuths);
                                    }
                                }


								var mthd_clr = null;
								var path_clr = null;
                                switch(val3.method){
                                    case 'GET':
                                        mthd_clr = '#00CC00';
                                        path_clr = "#cbf3cb";
                                        break;
                                    case 'PUT':
                                        mthd_clr = '#CCCC00';
                                        break;
                                    case 'POST':
                                        mthd_clr = '#CC6600';
                                        break;
                                    case 'DELETE':
                                        mthd_clr = '#CC0000';
                                        break;
                                }

                                out += `<div class='panel panel-default'>
                                            <div class='panel-heading'>
                                                <div class='row panel panel-blue' style='padding:0px;margin-left:0px;margin-right:0px;'>
                                                    <div class='col-md-1' style='padding-top:8px;padding-bottom:8px;background-color:`+mthd_clr+`'>`+val3.method+`</div>
                                                        <div class='col-md-5' style='padding:0px;margin:0px;'>
                                                            <h4 class='panel-title'>
                                                            <a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion-`+count+`' href='#collapse-`+count+`' style='background-color:`+path_clr+`;line-height:2.0;'>`+val3.path+`</a>
                                                            </h4>
                                                        </div>
                                                        <div class='col-md-5' style="padding-top:8px;padding-bottom:8px;">
                                                            <span style='font-weight:normal;font-family:Arial, sans-serif;font-size: 13px;line-height:1.6;'>`+val3.description+`</span>
                                                        </div>`;

                                if(hookRoleExists){
                                 out += `               <div class='col-md-1' style="padding:0px;margin:0px;">
                                                            <button onclick="location.href='hook_create.html?k2=`+key2+`&k3=`+key2+`'" type='button' class='btn btn-primary' style='font-weight:normal;font-family:Arial, sans-serif;font-size: 15px;line-height:1.6;margin-left:8%;float:right;'>Hook</button>
                                                        </div>`;
                                }
                                out += `            </div>
                                                </div>
                                                <div id='collapse-`+count+`' class='panel-collapse collapse'>
                                                    <div style='padding:10px;background-color:#E7E7E7'>

                                                        <div class='panel panel-grey margin-bottom-40'>
                                                            <div class='panel-heading'>
                                                                <h3 class='panel-title' style='padding-left:15px;'>URI</h3>
                                                            </div>
                                                        <div class='panel-body'>`+path+`</div>
                                                    </div>
                                                    </br>`;

                                <!-- START EXAMPLE CALL -->
                                 out += "           <header style='font-weight:bold;font-size: 12px;'>Example API Call</header>";

                                if(val3.inputjson!=null){
                                        out += "     <div class='alert alert-warning' style='padding:5px;'>curl -v -i -H 'Content-Type: application/json' -H 'Authorization: Bearer &lt;YOUR TOKEN HERE&gt;' --request "+val3.method+" -d "+val3.inputjson+" 'http://localhost:8080"+val3.path+"'</div>";
                                }else{
                                        out += "     <div class='alert alert-warning' style='padding:5px;'>curl -v -i -H 'Content-Type: application/json' -H 'Authorization: Bearer &lt;YOUR TOKEN HERE&gt;' --request "+val3.method+" 'http://localhost:8080"+val3.path+"'</div>";
                                }

                                out += "            </br>";
                                            <!-- END EXAMPLE CALL -->


                                <!-- START REQUEST VARS -->
                                var receives = "";
                                receives += `<div class='panel panel-grey margin-bottom-40'>
                                                <div class='panel-heading' style='padding-left:15px;'>
                                                    <h3 class='panel-title'>Request Variables</h3>
                                                </div>
                                                <div class='panel-body' style='padding:5px;'>
                                                    <table class='table'>
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Type</th>
                                                                <th>Desc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>`;

                                var receivesNull = true

                                $.each(val3.receives,function(key4,val4){
                                    var pass = false
                                    if(key4=='permitAll'){
                                        pass = true
                                    } else {
                                        var arr = window.token.authorities
                                        for(var i = 0, len = arr.length; i < len; i++) {
                                            if (arr[i][key4]) { pass = true; }
                                        }
                                    }
                                    if(pass){
                                        $.each(val4,function(key5,val5){

                                            if(val5!=null){
                                            if(receivesNull){ receivesNull=false; }

                                            receives += `                   <tr>
                                                                                <td>`+val5.name+`</td>
                                                                                <td>`+val5.paramType+`</td>
                                                                                <td>`+val5.description+`</td>`;

                                            receives += `                   </tr>`;

                                            }
                                        });
                                    }
                                });
                                if(receivesNull==false){
                                    receives += `                        </tbody>
                                                                    </table>
                                                                 </div>
                                                            </div>
                                                            <br/>`;
                                    <!-- END REQUEST VARS -->

                                    out += receives;
                                }

                                            <!-- START RESPONSE VARS -->
                                out += `            <div class='panel panel-grey margin-bottom-40'>
                                                        <div class='panel-heading' style='padding-left:15px;'>
                                                            <h3 class='panel-title''>Response Variables</h3>
                                                        </div>
                                                        <div class='panel-body' style='padding:5px;'>
                                                         <table class='table'>
                                                             <thead>
                                                                 <tr>
                                                                     <th>Name</th>
                                                                     <th>Type</th>
                                                                     <th>Desc</th>
                                                                 </tr>
                                                             </thead>
                                                             <tbody>`;

                                $.each(val3.returns,function(key6,val6){
                                    if(key6=='permitAll' || window.token.authorities.indexof(key6)>=0){
                                        $.each(val6,function(key7,val7){
                                             out += "                   <tr>";
                                             if(val7){
                                             out += `                      <td>`+val7.name+`</td>
                                                                            <td>`+val7.paramType+`</td>
                                                                            <td>`+val7.description+`</td>`;
                                             }else{
                                                out += "<td>&nbsp;</td>";
                                             }
                                             out += "                   </tr>";
                                        });
                                    }
                                });



                                out += `                        </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <br/>`;
<!-- END RESPONSE VARS -->
                                <!-- START SANDBOX -->
                                out += `            <div class='panel panel-grey margin-bottom-40'>
                                                        <div class='panel-heading' style='padding-left:15px;'>
                                                            <h3 class='panel-title'>API Sandbox</h3>
                                                        </div>
                                                        <div class='panel-body alert alert-warning' style='margin-bottom:0px;'>

                                                            <div class='form-inline' role='form'>
                                                                <div class='form-group col-md-1'>
                                                                    <select id='format_`+count+`' class='form-control' onChange='convert(this.options[this.selectedIndex].text,"jsonData_`+count+`")'>
                                                                        <option value='JSON'>JSON</option>
                                                                        <option value='XML'>XML</option>
                                                                    </select>
                                                                </div>`;


                                out += `                     <div class='form-group col-md-7'>
                                                                <label class='sr-only' for='exampleInputEmail2'>Request Data</label>`;
                                if(val3.inputjson!=null){
                                    out += "        <input type='text' id='jsonData_"+count+"' name='jsonData' class='form-control' style='width: 100%;' value='"+val3.inputjson+"'>";
                                }

                                out += "                    </div>";

                                out += `                    <div class='form-group col-md-4'>
                                                                <button type='submit' class='btn-u btn-u-dark' onclick='callApi("`+val3.method+`","`+path+`","`+count+`")'>Call API</button>
                                                                <button type='submit' class='btn-u btn-u-dark' onclick='generateTemplate("`+val3.method+`","`+path+`","`+count+`")'>Generate JS</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class='panel-body alert alert-warning' style='margin-bottom:0px;'>
                                                    <fieldset><section style='padding-top:0px;'>
                                                    <textarea disabled rows=4 cols=30 id='output_`+count+`' style='resize: none;resize: none;width:100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;'></textarea>
                                                    </section></fieldset>
                                                    </div>


                                                </div>`;

                                            <!-- END SANDBOX -->

                                out += `    </div>
                                        </div>
                                    </div>`;
                               count = count + 1;

							});
                            out += "</div>";
						});
					});
					document.getElementById("apidocs").innerHTML = out;
					}
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

		function convert(format,area) {
            var val = document.getElementById(area).value;
		    switch(format){
		        case 'JSON':
		            document.getElementById(area).value = JSON.stringify(x2js.xml_str2json(val));
		            break;
		        case 'XML':
		            document.getElementById(area).value = x2js.json2xml_str($.parseJSON(val))
		            break;
		    }

		}


		function callApi(method,path,count){
                var select = document.getElementById("format_"+count);
                var format = select.options[select.selectedIndex].text;

                var contenttype = "";
                var datatype = "";

                switch(format){
                    case 'JSON':
                        contenttype = "application/json";
                        datatype = "text json";
                        break;
                    case 'XML':
                        contenttype = "application/xml";
                        datatype = "text xml";
                        break;
                }

                if(method=='GET'){
                    var string = "";
                    switch(format){
                        case 'JSON':
                            var json = (document.getElementById("jsonData_"+count)!=null)?JSON.parse(document.getElementById("jsonData_"+count).value):null;
                            if(json!=null){
                                $.each(json, function(key,val){
                                    var str = key+"="+val+"&";
                                    string += str;
                                });
                            }
                            break;
                        case 'XML':
                            var xml = "<root>"+$("#jsonData_"+count).val()+"</root>"
                            parser = new DOMParser();
                            xmlDoc = parser.parseFromString(xml,"text/xml");

                            if(xmlDoc!=null){
                              x = xmlDoc.documentElement.childNodes;
                              for (i = 0; i < x.length ;i++) {
                                    var str = x[i].nodeName+"="+x[i].childNodes[0].nodeValue+"&";
                                    string += str;
                              }
                            }

                            break;
                    }
                    $.ajax({
                        type: 'GET',
                        url: window.url+"/v0.1/"+path+"?"+string,
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer '+window.token.access_token);
                        },
                        headers:{
                            'Content-Type': contenttype
                        },
                        dataType: datatype,
                        success: function(data) {
                            if(data){
                                switch(format){
                                    case 'JSON':
                                        document.getElementById("output_"+count).innerHTML = JSON.stringify(data);
                                        break;
                                    case 'XML':
                                        var xmlString;
                                        //IE
                                        if (window.ActiveXObject){
                                            xmlString = data.xml;
                                        }
                                        // code for Mozilla, Firefox, Opera, etc.
                                        else{
                                            xmlString = (new XMLSerializer()).serializeToString(data);
                                        }

                                        document.getElementById("output_"+count).innerHTML = xmlString;
                                        break;
                                }
                            }
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            document.getElementById("output_"+count).innerHTML = jqXHR.status+" : "+jqXHR.statusText;
                        },
                    });
                }else{
                    var jsonData = document.getElementById("jsonData_"+count).value;
                    $.ajax({
                        type: method,
                        url: window.url+"/v0.1/"+path,
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
                            'Content-Type': contenttype
                        },
                        dataType: datatype,
                        success: function(data) {

                            if(data){
                                switch(format){
                                    case 'JSON':
                                        document.getElementById("output_"+count).innerHTML = JSON.stringify(data);
                                        break;
                                    case 'XML':
                                        var xml = jQuery(data).text();
                                        var xmlString;
                                        //IE
                                        if (window.ActiveXObject){
                                            xmlString = data;
                                        }
                                        // code for Mozilla, Firefox, Opera, etc.
                                        else{
                                            xmlString = (new XMLSerializer()).serializeToString(data);
                                        }

                                        document.getElementById("output_"+count).innerHTML = xmlString;
                                        break;
                                }
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

        function generateTemplate(method,path,count){
                var select = document.getElementById("format_"+count);
                var format = select.options[select.selectedIndex].text;

                var contenttype = "";
                var datatype = "";
                switch(format){
                    case 'JSON':
                        contenttype = "application/json";
                        datatype = "text json";
                        break;
                    case 'XML':
                        contenttype = "application/xml";
                        datatype = "text xml";
                        break;
                }

                var out = "";
                if(method=='GET'){
                    var string = "";
                    switch(format){
                        case 'JSON':
                            var json = (document.getElementById("jsonData_"+count)!=null)?JSON.parse(document.getElementById("jsonData_"+count).value):null;
                            if(json!=null){
                                $.each(json, function(key,val){
                                    var str = key+"="+val+"&";
                                    string += str;
                                });
                            }
                            break;
                        case 'XML':
                            var xml = "<root>"+$("#jsonData_"+count).val()+"</root>"
                            parser = new DOMParser();
                            xmlDoc = parser.parseFromString(xml,"text/xml");

                            if(xmlDoc!=null){
                              x = xmlDoc.documentElement.childNodes;
                              for (i = 0; i < x.length ;i++) {
                                    var str = x[i].nodeName+"="+x[i].childNodes[0].nodeValue+"&";
                                    string += str;
                              }
                            }

                            break;
                    }
                    out = `
                    $.ajax({
                        type: 'GET',
                        url: '`+window.url+`/v0.1/`+path+`?`+string+`',
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer `+window.token.access_token+`');
                        },
                        headers:{
                            'Content-Type': '`+contenttype+`'
                        },
                        dataType: '`+datatype+`',
                        success: function(json) {
                            console.log(json);
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.statusText);
                            console.log(jqXHR.status);
                            console.log(jqXHR.getAllResponseHeaders());
                            console.log(textStatus);
                            console.log(errorThrown);
                        },
                    });`;
                }else{
                    var jsonData = document.getElementById("jsonData_"+count).value;
                    out = `
                    $.ajax({
                        type: method,
                        url: '`+window.url+`/v0.1/`+path+`',
                        data: JSON.stringify(jsonData),
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer `+window.token.access_token+`');
                        },
                        headers:{
                            'Content-Type': '`+contenttype+`'
                        },
                        dataType: '`+datatype+`',
                        success: function(json) {
                            console.log(json);
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.statusText);
                            console.log(jqXHR.status);
                            console.log(jqXHR.getAllResponseHeaders());
                            console.log(textStatus);
                            console.log(errorThrown);
                        },
                    });`;
                }
                document.getElementById("output_"+count).innerHTML = out;
        }


