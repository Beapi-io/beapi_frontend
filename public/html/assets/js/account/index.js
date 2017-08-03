


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
                        <section class="col-lg-12">
                            <div class="row">
                                <div class="form-group">
                                    <label class="label col col-2">Account</label>
                                    <div class="col col-10">
                                        <select id='account' class='form-control' onChange='getAccount(this.value,this.options[this.selectedIndex].text)'>
                                        <option>None Chosen</option>`;

					$.each(json, function(key,val){
                    	    out += "<option value='"+val.acct+"'>"+val.acctName+"</option>";
					});
					out += `
					                    </select>
                                    </div>
                                </div>
                            </div>
                        </section>`;

					document.getElementById("accounts").innerHTML = out;
					document.getElementById("acct_title").innerHTML = "Accounts";

                    //var element = document.getElementById('eventType');
                    //element.value = id;
                    //getReports(id,element.options[element.selectedIndex].text);

				},
               error: function(jqXHR, textStatus, errorThrown) {
				    var out = `
                        <section class='col-lg-12'>
                            <div class='row'>
                                <div class='form-group'>
                                    <label class='label col col-2'>Account Name</label>
                                    <div class='col col-10'>
                                    <input type='text' class='form-control' id='acctName'>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class='col-lg-12'>
                            <div class='row'>
                                <div class='form-group'>
                                    <div class='col col-12'>
                                        <button type='submit' class='btn-u btn-u-blue' onclick='createAccount()'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </section>`;

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

                    window.location.reload();
				},
				error: function(err) {
					console.log("error",err);
				}
			});
	}



