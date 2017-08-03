


    function initIndex(){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/acctPerson/list",
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
				dataType:"text json",
				success: function(json) {
				    var out = `
                            <div class="row">
                                <div class="form-group">
                                    <label class="label col col-2">Account</label>
                                    <div class="col col-10">
                                        <select id='account' class='form-control' onChange='getApplications(this.value,this.options[this.selectedIndex].text)'>
                                        <option>None Chosen</option>`;

					$.each(json, function(key,val){
                    	    out += "<option value='"+val.acct+"'>"+val.acctName+"</option>";
					});
					out += `
					                    </select>
                                    </div>
                                </div>
                            </div>`;

					document.getElementById("accounts").innerHTML = out;
					document.getElementById("acct_title").innerHTML = "Accounts";
				},
               error: function(jqXHR, textStatus, errorThrown) {
				    var out = `

                            <div class='row'>
                                <div class='form-group'>
                                    <label class='label col col-2'>Account Name</label>
                                    <div class='col col-8'>
                                    <input type='text' class='form-control' id='acctName'>
                                    </div>
                                    <div class='col col-2'>
                                        <button type='submit' class='btn-u btn-u-blue' onclick='createAccount()'>Submit</button>
                                    </div>
                                </div>
                            </div>`;

					document.getElementById("accounts").innerHTML = out;
					document.getElementById("acct_title").innerHTML = "Create Account";
                },
			});
	}

	function createAccount(){
			$.ajax({
				type:'POST',
				url: window.url+"/v0.1/account/create",
                crossDomain: true,
                cache:false,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+window.token.access_token
                },
                data: JSON.stringify({
                    acctName:$("#acctName").val(),
                }),
                dataType: 'json',
				success: function(json) {
				    var out = `
                            <div class="row">
                                <div class="form-group">
                                    <label class="label col col-2">Account</label>
                                    <div class="col col-10">
                                        <select id='account' class='form-control' onChange='getApplications(this.value,this.options[this.selectedIndex].text)'>
                                        <option>None Chosen</option>`;

					$.each(json, function(key,val){
                    	    out += "<option value='"+val.acct+"'>"+val.acctName+"</option>";
					});
					out += `
					                    </select>
                                    </div>
                                </div>
                            </div>`;

					document.getElementById("accounts").innerHTML = out;
					document.getElementById("acct_title").innerHTML = "Accounts";

				},
				error: function(err) {
					console.log("error",err);
				}
			});
	}

	function getApplications(val,acctName){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/application/list?acct="+val,
                crossDomain: true,
                cache:false,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+window.token.access_token
                },
                dataType: 'json',
				success: function(json) {
				    var out = `
                            <div class="row">
                                <div class="form-group">
                                    <label class="label col col-2">Application</label>
                                    <div class="col col-10">
                                        <select id='app' class='form-control' onChange='showApplication(this.value,this.options[this.selectedIndex].text)'>
                                        <option>None Chosen</option>`;

					$.each(json, function(key,val){
                    	    out += "<option value='"+val.id+"'>"+val.appName+"</option>";
					});
					out += `
					                    </select>
                                    </div>
                                </div>
                            </div>`;

					document.getElementById("apps").innerHTML = out;
					document.getElementById("acct_title").innerHTML = "Accounts";
				},
				error: function(err) {
				    var out = `
                            <div class='row'>
                                <div class='form-group'>
                                    <label class='label col col-2'>Application Name</label>
                                    <div class='col col-8'>
                                    <input type='text' class='form-control' id='appName'>
                                    </div>
                                    <div class='col col-2'>
                                        <button type='submit' class='btn-u btn-u-blue' onclick='createApplication()'>Submit</button>
                                    </div>
                                </div>
                            </div>`;

					document.getElementById("apps").innerHTML = out;
					document.getElementById("acct_title").innerHTML = "Accounts (Create Application)";
				}
			});
	}



