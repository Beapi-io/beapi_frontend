    function initApiDocs(){
            //console.log(window.url);
            console.log(window.token);


var url = window.url+'/v1.0/apidoc/show';
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.setRequestHeader("Authorization", "Bearer "+window.token);
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      if(xhr.status!=200){
          localStorage.removeItem('token');
          header = "common/nologin_header.html";
      }
   }
};
xhr.send();

/*
			$.ajax({
				type:'GET',
				url: window.url+'/v1.0/apidoc/show',
				crossDomain: true,
                cache:false,
                async:true,
                dataType: 'json',
                xhrFields: {
                    withCredentials: false
                },
				headers:{
				    'Access-Control-Allow-Origin':'http://test.nosegrind.net',
					'Authorization':'Bearer '+window.token.token
				},

				success: function(json) {
				    var out = "";
                    var count = 1;
                    if(json){ console.log('success ;'+json); }

				},
               error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.statusText =='abort') { return; }
                    console.log("fails :"+jqXHR.status);
                    console.log(jqXHR.getAllResponseHeaders());
                    console.log(textStatus);
                    //alert(jqXHR.responseText);
                },
			});
			*/

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
                            request.setRequestHeader('Authorization','Bearer '+window.token.token);
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
                            request.setRequestHeader('Authorization','Bearer '+window.token.token);
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
                        url: '`+window.url+`/v1.0/`+path+`?`+string+`',
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer `+window.token.token+`');
                        },
                        headers:{
                            'Content-Type': '`+contenttype+`'
                        },
                        dataType: '`+datatype+`',
                        success: function(json) {
                            //console.log(json);
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
                        url: '`+window.url+`/v1.0/`+path+`',
                        data: JSON.stringify(jsonData),
                        crossDomain: true,
                        cache:false,
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization','Bearer `+window.token.token+`');
                        },
                        headers:{
                            'Content-Type': '`+contenttype+`'
                        },
                        dataType: '`+datatype+`',
                        success: function(json) {
                            //console.log(json);
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


