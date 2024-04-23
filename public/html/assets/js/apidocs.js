    function initApiDocs(){
        var tmp = JSON.parse(window.token);

        var appVersion = "1.0"
        var url = window.url+'/v'+appVersion+'/apidoc/show';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", "Bearer "+tmp.token);
        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
              //console.log(xhr.status);
              //console.log(xhr.responseText);
            if(xhr.status==401){
              localStorage.removeItem('token');
              header = "common/nologin_header.html";
            }else if(xhr.status!=200){
                alert(xhr.responseText);
            }else{
                var out = "";
                document.getElementById("apidocs").innerHTML = null
                var json = JSON.parse(xhr.responseText);

                var controllers = Object.keys(json);
                var count = 1;
                for (const cont of controllers) {

                    out += `<header style='font-weight:bold;font-size: 16px;'>`+cont.toUpperCase()+`</header>
                            <div class='panel-group acc-v1' id='accordion-"+count+"'>`;

                    var versions = json[cont];
                    var temp = Object.keys(versions);
                    for (const vers of temp) {
                        var actions = versions[vers];
                        var temp2 = Object.keys(actions);
                        for (const action of temp2) {
                            var apiObject = actions[action];

                            var mthd_clr = null;
                            var path_clr = null;
                            switch(apiObject.method){
                                case 'GET':
                                    mthd_clr = '#00CC00';
                                    path_clr = "#cbf3cb";
                                    break;
                                case 'PUT':
                                    mthd_clr = '#CCCC00';
                                    path_clr = "#eeef95";
                                    break;
                                case 'POST':
                                    mthd_clr = '#CC6600';
                                    path_clr = "#fbc795";
                                    break;
                                case 'DELETE':
                                    mthd_clr = '#cc1d1d';
                                    path_clr = "#f3acac";
                                    break;
                            }
                            var path = "/v"+appVersion+"/"+cont+"/"+action;

                            out += `<div class='panel panel-default'>
                                        <div class='panel-heading'>
                                            <div class='row panel panel-blue' style='padding:0px;margin-left:0px;margin-right:0px;'>
                                                <div class='col-md-1' style='padding-top:8px;padding-bottom:8px;background-color:`+mthd_clr+`'>`+action+`</div>
                                                    <div class='col-md-5' style='padding:0px;margin:0px;'>
                                                        <h4 class='panel-title'>
                                                        <a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion-`+count+`' href='#collapse-`+count+`' style='background-color:`+path_clr+`;line-height:2.0;'>`+path+`</a>
                                                        </h4>
                                                    </div>
                                                    <div class='col-md-5' style="padding-top:8px;padding-bottom:8px;">
                                                        <span style='font-weight:normal;font-family:Arial, sans-serif;font-size: 13px;line-height:1.6;'>`+apiObject.description+`</span>
                                                    </div>`;
                            if(apiObject.hook){
                                out += `               <div class='col-md-1' style="padding:0px;margin:0px;">
                                                        <button onclick="location.href='hook_create.html?k2=`+cont+`&k3=`+action+`'" type='button' class='btn btn-primary' style='font-weight:normal;font-family:Arial, sans-serif;font-size: 15px;line-height:1.6;margin-left:8%;float:right;'>Create Hook</button>
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

                            //if(val3.inputjson!=null){
                            //    out += "     <div class='alert alert-warning' style='padding:5px;'>curl -v -i -H 'Content-Type: application/json' -H 'Authorization: Bearer &lt;YOUR TOKEN HERE&gt;' --request "+apiObject.method+" -d "+val3.inputjson+" 'http://localhost:8080"+path+"'</div>";
                            //}else{
                                out += "     <div class='alert alert-warning' style='padding:5px;'>curl -v -i -H 'Content-Type: application/json' -H 'Authorization: Bearer &lt;YOUR TOKEN HERE&gt;' --request "+apiObject.method+" '"+window.url+path+"'</div>";
                            //}

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



                            if(apiObject.receives){
                                for (const rec of apiObject.receives) {
                                receives += "                   <tr>";
                                receives += `                       <td>`+rec.name+`</td>
                                                                    <td>`+rec.type+`</td>
                                                                    <td>`+rec.description+`</td>`;
                                receives += "                   </tr>";
                                }

                            }

                            receives += `                        </tbody>
                                                            </table>
                                                         </div>
                                                    </div>
                                                    <br/>`;
                            out += receives;

                            <!-- END REQUEST VARS -->


                            <!-- START RESPONSE VARS -->
                            var returns = "";
                            returns += `            <div class='panel panel-grey margin-bottom-40'>
                                                    <div class='panel-heading' style='padding-left:15px;'>
                                                        <h3 class='panel-title'>Response Variables</h3>
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

                            if(apiObject.returns){
                                for (const ret of apiObject.returns) {
                                returns += "                   <tr>";
                                returns += `                        <td>`+ret.name+`</td>
                                                                    <td>`+ret.type+`</td>
                                                                    <td>`+ret.description+`</td>`;
                                returns += "                   </tr>";
                                }
                            }

                            returns += `                        </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <br/>`;

                            out += returns;
                            <!-- END RESPONSE VARS -->

                                            out += `    </div>
                                                    </div>
                                                </div>`;



                    count = count + 1;
                                    }
                                }

                                                            out += "</div>";
                            }
                            document.getElementById("apidocs").innerHTML = out;
                          }
                       }
        };
        xhr.send();
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
                        url: window.url+"/v1.0/"+path+"?"+string,
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer '+tmp.token);
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
                        url: window.url+"/v1.0/"+path,
                        data: JSON.stringify(jsonData),
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer '+tmp.token);
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
                            //console.log(jqXHR.statusText);
                            //console.log(jqXHR.status);
                            //console.log(jqXHR.getAllResponseHeaders());
                            //console.log(textStatus);
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
                        url: window.url+"/v1.0/"+path+"?"+string,
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer `+tmp.token+`');
                        },
                        headers:{
                            'Content-Type': contenttype
                        },
                        dataType: datatype,
                        success: function(json) {
                            //console.log(json);
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            //console.log(jqXHR.statusText);
                            //console.log(jqXHR.status);
                            //console.log(jqXHR.getAllResponseHeaders());
                            //console.log(textStatus);
                            //console.log(errorThrown);
                            alert(errorThrown);
                        },
                    });`;
                }else{
                    var jsonData = document.getElementById("jsonData_"+count).value;
                    out = `
                    $.ajax({
                        type: method,
                        url: '`+window.url+`/v1.0/`+path+`',
                        data: JSON.stringify(jsonData),
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer `+tmp.token+`');
                        },
                        headers:{
                            'Content-Type': '`+contenttype+`'
                        },
                        dataType: '`+datatype+`',
                        success: function(json) {
                            //console.log(json);
                        },
                       error: function(jqXHR, textStatus, errorThrown) {
                            //console.log(jqXHR.statusText);
                            //console.log(jqXHR.status);
                            //console.log(jqXHR.getAllResponseHeaders());
                            //console.log(textStatus);
                            //console.log(errorThrown);
                            alert(errorThrown);
                        },
                    });`;
                }
                document.getElementById("output_"+count).innerHTML = out;
        }

