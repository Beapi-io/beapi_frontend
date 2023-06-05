function initCreateHooks(){

    console.log("### initCreateHooks ###")
    var tmp = JSON.parse(window.token);

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === this.DONE){
            if (xhr.status === 200) {
                console.log("Success : "+this.responseText);
            }else{
                console.log("Fail : "+this.status);
            }
        }
    });

    xhr.open("GET", "http://localhost:8080/v1.0/properties/webhookProps");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+tmp.token);

    xhr.send(data);

/*


    var appVersion = "1.0"
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/v1.0/properties/webhookProps",
        cache:false,
        async:true,
        contentType: 'application/json',
        dataType:'text json',
        headers: {
            'Authorization': 'Bearer '+tmp.token
        },
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        error: function (xhr, textStatus, thrownError){
            console.log('error: ' + thrownError);
        },
        success: function (data, textStatus, xhr){
            console.log('success');
        },
        complete: function (xhr, textStatus) {
            console.log('complete');
        }
    }).done(function(data, textStatus, jqXHR) {
        console.log('done : '+textStatus);
        if(textStatus=='success'){
            //var obj = JSON.parse(jqXHR.responseText);
            //var tmp = JSON.stringify(obj);

            var tmp = jqXHR.responseText
            localStorage.setItem('token', tmp);

            // reload header
            var header = null;
            var test = localStorage.getItem('token');
            if(test!=null){
                header = "common/admin_header.html";
            }else{
                header = "common/nologin_header.html";
            }

            $("#orp_header").load(header);
            location.reload();
        };
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connected.Verify Network.'+window.url+'.Error:'+errorThrown;
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]\n' + jqXHR.responseText;
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].\n' + jqXHR.responseText;
        } else if (exception === 'parsererror') {
            msg = 'Bad Credentials. Please Try Again';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        alert(msg);
    })
    */


    /*
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer "+tmp.token);
    xhr.onreadystatechange = function () {
        console.log("### calling... ###")
       if (xhr.readyState === 4) {
          if(xhr.status!=200){
              localStorage.removeItem('token');
              header = "common/nologin_header.html";
          }else{
            var out = "";
            document.getElementById("apidocs").innerHTML = null
            var json = JSON.parse(xhr.responseText);
            out = json;
            document.getElementById("apidocs").innerHTML = out;
          }
       }
    };
    xhr.send();
    */
}
