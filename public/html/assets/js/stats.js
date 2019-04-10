
    function initStats(){
			$.ajax({
				type:'GET',
				url: window.url+"/v0.1/stat/show",
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
				    console.log('success');
				    console.log(json);
				    var out = "";
                    var count = 1;
                    if(json){
                        console.log(json);
                        console.log(json.apiTotals);
					    //$.each(json, function(key,val){})
					}

					var ctx1 = document.getElementById('bar-chart').getContext('2d');
					new Chart(ctx1, {
                          type: 'line',
                          data: {
                            labels: ['1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12AM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM','12PM'],
                            datasets: [
                              {
                                label: "Daily API Statistics",
                                fill:true,
                                backgroundColor: ["#3e95cd"],
                                data: [
                                    json['apiTotals']['1AM'],
                                    json['apiTotals']['2AM'],
                                    json['apiTotals']['3AM'],
                                    json['apiTotals']['4AM'],
                                    json['apiTotals']['5AM'],
                                    json['apiTotals']['6AM'],
                                    json['apiTotals']['7AM'],
                                    json['apiTotals']['8AM'],
                                    json['apiTotals']['9AM'],
                                    json['apiTotals']['10AM'],
                                    json['apiTotals']['11AM'],
                                    json['apiTotals']['12AM'],
                                    json['apiTotals']['1PM'],
                                    json['apiTotals']['2PM'],
                                    json['apiTotals']['3PM'],
                                    json['apiTotals']['4PM'],
                                    json['apiTotals']['5PM'],
                                    json['apiTotals']['6PM'],
                                    json['apiTotals']['7PM'],
                                    json['apiTotals']['8PM'],
                                    json['apiTotals']['9PM'],
                                    json['apiTotals']['10PM'],
                                    json['apiTotals']['11PM'],
                                    json['apiTotals']['12PM']
                                ]
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

					var ctx2 = document.getElementById('pie-chart1').getContext('2d');
					new Chart(ctx2, {
                          type: 'pie',
                          data: {
                            labels: ['Fred','Nancy','Tom','Phil'],
                            datasets: [
                              {
                                label: "Top 5 Users",
                                backgroundColor: ['#36a2eb','#cc65fe','#3e95cd','#ff6384'],
                                data: [2478,5267,734,3895]
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
                             labels: ['200','400','401','405'],
                             datasets: [
                               {
                                 label: "Top 5 Return Codes",
                                 backgroundColor: ['#36a2eb','#cc65fe','#3e95cd','#ff6384'],
                                 data: [2478,50,73,38]
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

                      var ctx4 = document.getElementById('pie-chart3').getContext('2d');
                      new Chart(ctx4, {
                             type: 'pie',
                             data: {
                               labels: ['200','400','401','405'],
                               datasets: [
                                 {
                                   label: "Top 5 Return Codes",
                                   backgroundColor: ['#36a2eb','#cc65fe','#3e95cd','#ff6384'],
                                   data: [2478,50,73,38]
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

                        //$.each(val3.returns,function(key6,val6){
                        //     if(key6=='permitAll' || window.token.authorities.indexof(key6)>=0){
                        //         $.each(val6,function(key7,val7){
                        //              out += "                   <tr>";
                        //              if(val7){
                        //              out += `                      <td>`+val7.name+`</td>
                        //                                             <td>`+val7.paramType+`</td>
                        //                                             <td>`+val7.description+`</td>`;
                        //              }else{
                        //                 out += "<td>&nbsp;</td>";
                        //              }
                        //              out += "                   </tr>";
                        //         });
                        //     }
                        //});



                        out += `                        </tbody>
                                                     </table>
                                                 </div>
                                             </div>

                                             <br/>`;
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


