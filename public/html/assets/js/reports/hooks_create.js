	function initData(k2,k3){
	        var existingPath = k2+"/"+k3;
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
				    var hookRoleExists=false;
				    // if(hookRoleExists==false){if($.inArray(item,json.authorities)>=0){hookRoleExists=true}};
				    var out = "<option>None Selected</option>";
                    var count = 1;
					$.each(json, function(key,val){
						$.each(val,function(key2,val2){
                            $.each(val2,function(key3,val3){

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

                                if(hookRoleExists){
                                    var path = key2+"/"+key3;
                                    if(path==existingPath){
                                        out += "<option value='"+val3.method+"' selected>"+path+"</option>";
                                    }else{
                                        out += "<option value='"+val3.method+"'>"+path+"</option>";
                                    }
                                }
                            });
						});
					});
					document.getElementById("services").innerHTML = out;
				},
				error: function(err) {
					console.log("error",err);
				}
			});
	}






    function createForm(elem){
        document.getElementById("collapse-One").classList.add('in');
    }

	function createHook(){
			$.ajax({
				type:'PUT',
				url: window.url+"/v0.1/hook/create",
                crossDomain: true,
                cache:false,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+window.token.access_token
                },
                data: JSON.stringify({
                    url:$("#endpoint").val(),
                    format:$("#format").val(),
                    service:$("#services").val()
                }),
                dataType: 'json',
				success: function(json) {
                    console.log("success:"+json)
				},
				error: function(err) {
					console.log("error",err);
				}
			});
	}

