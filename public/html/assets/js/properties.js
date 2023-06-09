function initProperties(){
    console.log("### initCreateHooks ###")
    var tmp = JSON.parse(window.token);

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === this.DONE){
            switch(this.status) {
              case 200:
                var out = "";
                document.getElementById("apidocs").innerHTML = null
                var json = JSON.parse(this.responseText);
                var props = Object.keys(json);

                out += `<div class='panel panel-default'>
                            <div class='panel-heading'>`;
                for (const prop of props) {
                out += `
                                    <div class='row panel panel-blue' style='padding:0px;margin-left:0px;margin-right:0px;'>
                                        <div class='col-md-4' style='padding-top:8px;padding-bottom:8px;background-color:#00CC00'>`+prop+`</div>
                                            <div class='col-md-5' style="padding-top:8px;padding-bottom:8px;">
                                                <span style='font-weight:normal;font-family:Arial, sans-serif;font-size: 13px;line-height:1.6;'>`+json[prop]+`</span>
                                            </div>
                                        </div>
                                    </div>`;
                }
                out += `      </div>
                        </div>`;
                 document.getElementById("apidocs").innerHTML = out;
                break;
              case 401:
                  localStorage.removeItem('token');
                  header = "common/nologin_header.html";
                break;
              default:
                alert(this.responseText);
            }
        }
    });

    xhr.open("GET", "http://localhost:8080/v1.0/properties/getProperties");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer "+tmp.token);

    xhr.send(data);

};
