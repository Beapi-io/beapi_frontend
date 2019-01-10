
    function initStats(){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/stats/show",
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
					    $.each(json, function(key,val){})
					}

					var ctx = document.getElementById('bar-chart').getContext('2d');
					new Chart(ctx, {
                          type: 'line',
                          data: {
                            labels: ['1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12AM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM','12PM'],
                            datasets: [
                              {
                                label: "Daily API Statistics",
                                fill:true,
                                backgroundColor: ["#3e95cd"],
                                data: [2478,5267,734,784,433,2478,5267,734,784,433,2478,5267,734,784,433,2478,5267,734,784,433,2478,5267,734,784]
                              }
                            ]
                          },
                          options: {
                            legend: { display: true },
                            title: {
                              display: true,
                              text: 'Predicted world population (millions) in 2050'
                            }
                          }
                     });


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


