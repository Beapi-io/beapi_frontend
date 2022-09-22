
    function initStats(){
			$.ajax({
				type:'GET',
				url: window.url+"/v1.0/stat/show",
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

					var userLabel = []
					var userData = []

                    var statLabel = []
                    var statData = []

                    var codeLabel = []
                    var codeData = []

                    if(json){

                        for (var k in json['userTotals']){
                            userLabel.push(k);
                            userData.push(json['userTotals'][k]);
                        }

                        for (var k in json['apiTotals']){
                            statLabel.push(k);
                            statData.push(json['apiTotals'][k]);
                        }

                        for (var k in json['codeTotals']){
                            codeLabel.push(k);
                            codeData.push(json['codeTotals'][k]);
                        }

					}

					var ctx1 = document.getElementById('bar-chart').getContext('2d');
					new Chart(ctx1, {
                          type: 'line',
                          data: {
                            labels: statLabel,
                            datasets: [
                              {
                                label: "Daily API Statistics",
                                fill:true,
                                backgroundColor: ["#3e95cd"],
                                data: statData
                              }
                            ]
                          },
                          options: {
                            legend: { display: true },
                            title: {
                              display: true,
                              text: 'Daily API Report'
                            }
                          }
                     });


					var ctx2 = document.getElementById('pie-chart1').getContext('2d');
					new Chart(ctx2, {
                          type: 'pie',
                          data: {
                            labels: userLabel,
                            datasets: [
                              {
                                label: "Top 5 Users",
                                backgroundColor: ['#36a2eb','#cc65fe','#3e95cd','#ff6384'],
                                data: userData
                              }
                            ]
                          },
                          options: {
                            title: {
                              display: true,
                              text: 'Top 5 Users'
                            }
                          }
                     });


                    var ctx3 = document.getElementById('pie-chart2').getContext('2d');
                    new Chart(ctx3, {
                           type: 'pie',
                           data: {
                             labels: codeLabel,
                             datasets: [
                               {
                                 label: "Top 5 Return Codes",
                                 backgroundColor: ['#36a2eb','#cc65fe','#3e95cd','#ff6384'],
                                 data: codeData
                               }
                             ]
                           },
                           options: {
                             title: {
                               display: true,
                               text: 'Top 5 Return Codes'
                             }
                           }
                      });



				},
               error: function(jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    if (jqXHR.statusText =='abort') { return; }
                    console.log(jqXHR.status);
                    //console.log(jqXHR.getAllResponseHeaders());
                    console.log(textStatus);
                    alert(jqXHR.responseText);
                },
			});
	}


