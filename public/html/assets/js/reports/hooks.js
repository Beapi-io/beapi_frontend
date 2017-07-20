	function initData(){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/hook/list",
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
                    var mydata = [];

				    $.each(json, function(key,val){
                        var row = {
                            "id":val.id,
                            "users":val.userId,
                            "callback":val.url,
                            "format":val.format,
                            "service":val.service,
                            "actions":val.id
                        }
                        mydata.push(row);
                    });
                   $('#table').bootstrapTable({
                      data: mydata
                   });

				},
               error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.statusText == 'abort') { return; }
                    console.log(jqXHR.status);
                    //console.log(jqXHR.getAllResponseHeaders());
                    console.log(textStatus);
                    alert(jqXHR.responseText);
                },
			});
	}



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