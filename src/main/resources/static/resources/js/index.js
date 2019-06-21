

var app ={
    $wrapper : $wrapper = document.getElementById('wrapper'),
    join_form : join_form,
    join : join,
    login : login,
    login_form : login_form,
    mypage2: mypage2,
    mypage : mypage,
    init : init,
    count : count,
    update : update,
    updateform : updateform,
    remove : remove
}

var employee = {
    customer_list : customer_list,
    admin_login : admin_login,
    customer_list_form : customer_list_form
};
//restful 방식
var session = {
    set_value : set_value,
    get_value : get_value
};
function set_value(x){
    sessionStorage.setItem(x.name,x.value);
}

function get_value(x){
    return sessionStorage.getItem(x);
}

function init(){
        $wrapper = document.getElementById('wrapper');
        $wrapper.innerHTML = app.login_form();
        document.getElementById('join-btn').addEventListener('click',()=>{
        $wrapper.innerHTML = app.join_form();
        document.getElementById('confirmBtn').addEventListener('click', (e)=>{
                e.preventDefault();
                app.join();
            });
        document.getElementById('cancelBtn').addEventListener('click', (e)=>{
                e.preventDefault();
                alert("다시입력해주세요.");
                $wrapper.innerHTML = app.join_form();
        })    
        });
        document.getElementById('login-btn').addEventListener('click',(e)=>{
            e.preventDefault();
            app.login({userid : 'customerId',
                        domain : 'customers'});
        });
        document.getElementById('admin-btn').addEventListener('click',(e)=>{
            e.preventDefault();
            employee.admin_login();
        });
        
}

function join(){
      let xhr = new XMLHttpRequest();
        let data = {
            customerId : document.getElementById('customerId').value,
            customerName : document.getElementById('customerName').value,
            password : document.getElementById('password').value,
            ssn : document.getElementById('ssn').value,
            phone : document.getElementById('phone').value,
            city : document.getElementById('city').value,
            address : document.getElementById('address').value,
            postalcode : document.getElementById('postalcode').value,
            photo : document.getElementById('photo').value
        }
        xhr.open("POST","customers",true);
        xhr.setRequestHeader('Content-type','application/json', 'charset=utf-8');
        xhr.onload=()=>{
            if(xhr.readyState==4 && xhr.status==200){
                 let d = JSON.parse(xhr.responseText);
                if(d.result=="SUCCESS"){
                    alert("가입 성공 성공"+d.result);
                    app.init();
                }
            }
            else{
                alert("ajax실패");
            }
        }
        xhr.send(JSON.stringify(data));
}

function login(){
    id = document.getElementById('customerId').value,
    pass = document.getElementById('password').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'customers/'+id+'/'+pass, true);
    xhr.onload=()=>{
        if(xhr.readyState=== 4 && xhr.status === 200){
            let b = JSON.parse(xhr.responseText);
            if(b.customerId===id && b.password===pass){
                alert(Object.value(b));
                alert(Object.keys(b));
                session.set_value({'name':'user','value':b});
                app.mypage2(b);
            }else{
                $wrapper.innerHTML = customer.login_form();
                alert("다시 입력하세요.");
            }
            
        }
        else{
            alert("실패");
        }
    };
    xhr.send();  
}


function login_form(){
return '<form action="/action_page.php">'
+'  ID:<br>'
+'  <input type="text" id="customerId" name="customerId">'
+'  <br>'
+'  PASSWORD:<br>'
+'  <input type="text" id="password" name="password">'
+'  <br><br>'
+'  <input id="login-btn" type="button" value="LOGIN">'
+'  <input id="join-btn" type="button" value="JOIN">'
+'  <input id="admin-btn" type="button" value="admin">'
+'</form> ';
};
function join_form(){
return'<form>'
+'  아이디<br>'
+'	<input type="customerId" id="customerId" name="customerId"><br>'
+'	이름<br>'
+'	<input type="customerName" id="customerName" name="customerName"><br>'
+'	비밀번호<br>'
+'	<input type="password" id="password" name="password"><br>'
+'	주민번호<br>'
+'	<input type="ssn" id="ssn" name="ssn"><br>'
+'	전화번호<br>'
+'	<input type="phone" id="phone" name="phone"><br>'
+'	city<br>'
+'	<input type="city" id="city" name="city"><br>'
+'	주소<br>'
+'	<input type="address" id="address" name="address"><br>'
+'	우편번호<br>'
+'	<input type="postalcode" id="postalcode" name="postalcode"><br>'

+'	사진<br>'
+'	<input type="photo" id="photo" name="photo"><br>'

+'	<input id="confirmBtn" type="submit" value="확인">'
+'	<input id="cancelBtn" type="reset" value="취소">'
+'</form>';
}

function mypage2(x){
    $wrapper.innerHTML = app.mypage(x);
    alert("세션 테스트"+ session.get_value("user")+"인근");
    document.getElementById("updateBtn").addEventListener('click',(e)=>{
        e.preventDefault();
    $wrapper.innerHTML = app.updateform(x);
        document.getElementById("u_confirmBtn").addEventListener('click',(e)=>{
            e.preventDefault();
            app.update();
        });
    });
    document.getElementById("deleteBtn").addEventListener('click',()=>{
        app.remove(x);
    });
    
}

function mypage(x){
    let a = x;
    return '<h1>마이페이지</h1>'
    +'  <span>아이디</span> : '
    +'	<span id="customerId" name="customerId">'+a.customerId+'</sapn><br>'
    +'	<span>이름</span> : '
    +'	<span type="customerName" id="customerName" name="customerName">'+a.customerName+'</sapn><br>'
    +'	<span>비밀번호</span> : '
    +'	<span type="password" id="password" name="password">'+a.password+'</sapn><br>'
    +'	<span>우편번호</span> : '
    +'	<span type="ssn" id="ssn" name="ssn">'+a.ssn+'</sapn><br>'
    +'	<span>전화번호</span> : '
    +'	<span type="phone" id="phone" name="phone">'+a.phone+'</sapn><br>'
    +'	<span>city</span> : '
    +'	<span type="city" id="city" name="city">'+a.city+'</sapn><br>'
    +'	<span>주소</span> : '
    +'	<span type="address" id="address" name="address">'+a.address+'</sapn><br>'
    +'	<span>우편번호</span> : '
    +'	<span type="postalcode" id="postalcode" name="postalcode">'+a.postalcode+'</sapn><br>'
    +'	<span>사진</span> : '
    +'	<span type="photo" id="photo" name="photo">'+a.photo+'</sapn><br>'
    +' <button id=updateBtn>수정</button>'
    +' <button id=deleteBtn>삭제</button>';
};

function update(){
        let id = document.getElementById("customerId");
        let xhr = new XMLHttpRequest();
        let data2 = {
            customerId : document.getElementById('u_customerId').value,
            customerName : document.getElementById('u_customerName').value,
            password : document.getElementById('u_password').value,
            ssn : document.getElementById('u_ssn').value,
            phone : document.getElementById('u_phone').value,
            city : document.getElementById('u_city').value,
            address : document.getElementById('u_address').value,
            postalcode : document.getElementById('u_postalcode').value,
            photo : document.getElementById('u_photo').value
        }
        xhr.open('PUT', 'customers/'+id, true);
        xhr.setRequestHeader('Content-type','application/json', 'charset=utf-8');
        xhr.onload=()=>{
            if(xhr.readyState==4 && xhr.status==200){
               let d = JSON.parse(xhr.responseText);
               if(d){
                   alert("업데이트 성공");
                   app.mypage2(d);
               }
               else{
                alert("실패");
               }
           }
           else{
               alert("ajax실패");
           }
        }
        xhr.send(JSON.stringify(data2));
    };

function updateform(x){
        let a = x;
        return'<form>'
        +'  아이디:'
        +'	<input type="u_customerId" id="u_customerId" name="u_customerId" value='+a.customerId+'><br>'
        +'	이름:'
        +'	<input type="u_customerName" id="u_customerName" name="u_customerName" value='+a.customerName+'><br>'
        +'	비밀번호:'
        +'	<input type="u_password" id="u_password" name="u_password" value='+a.password+'><br>'
        +'	주민번호:'
        +'	<input type="u_ssn" id="u_ssn" name="u_ssn" value='+a.ssn+'><br>'
        +'	전화번호:'
        +'	<input type="u_phone" id="u_phone" name="u_phone" value='+a.phone+'><br>'
        +'	city:'
        +'	<input type="u_city" id="u_city" name="u_city" value='+a.city+'><br>'
        +'	주소:'
        +'	<input type="u_address" id="u_address" name="u_address" value='+a.address+'><br>'
        +'	우편번호:'
        +'	<input type="u_postalcode" id="u_postalcode" name="u_postalcode" value='+a.postalcode+'><br>'
        
        +'	사진<br>'
        +'	<input type="u_photo" id="u_photo" name="u_photo" value='+a.photo+'><br>'
        
        +'	<input id="u_confirmBtn" type="submit" value="수정">'
        +'	<input id="u_cancelBtn" type="reset" value="취소">'
        +'</form>';
    ;
}    
function remove(x){
    let id = x.customerId;
    alert(id);
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "customers/"+id, true);
    xhr.onload=()=>{
        if(xhr.readyState==4 && xhr.status==200){
            let b = JSON.parse(xhr.responseText);
            if(b.result =="DELETE"){
                alert("회원정보가 삭제되었습니다.");
            }
            else{
                alert("관리자에게 문의하세요.");
            }
        }
    }
    xhr.send(); 
};
function admin_login(){

    let isAdmin = confirm("관리자입니까?");
    if(isAdmin){
        let pass =prompt("관리자 번호를 입력하세요.");
        if(pass==1000){
            employee.customer_list('1'); //일페이지 넘어가게 할려고
        }
        else{
            alert("입력한 번호가 일치하지 않습니다.");
        }
    }else{
        alert("관리자만 접속이 가능합니다.");
    }

}

function create_customer_row(x) {
    return  "<tr><td>"+x.customerId+"</td><td>"+x.customerName+"</td>"
                +"<td>"+x.ssn+"</td><td>"+x.phone+"</td><td>"+x.city+"</td></tr>"; 
}

function customer_list(x){   
    let xhr = new XMLHttpRequest();
    // pageNum, pageSize, blockSize
   xhr.open('GET', 'customers/page/'+x, true);
   xhr.onload=()=>{
       if(xhr.readyState=== 4 && xhr.status === 200){
           let d = JSON.parse(xhr.responseText);
           let wrapper = document.querySelector('#wrapper');
           wrapper.innerHTML = employee.customer_list_form();
           let tbody = document.getElementById('tbody');
           let i = 0;
           d.list.forEach((v, i)=>{
               let row  = create_customer_row(v)
               tbody.innerHTML+=row;
           });
           let blocks = document.createElement('div');
           blocks.setAttribute('id', 'blocks');
           wrapper.appendChild(blocks);
           let spans = '';
           i = 1;
           for(;i<6;i++){
               spans += "<span>"+i+"</span>";
               blocks.innerHTML=spans;
                span,setAttribute("class",'page-num');
                if( x== spans.innerHTML){
                    spans.style.backgroundColor = "red";
                }
                let clss = document.getElementsByClassName('page-num');
                    /**  i=0;
                     for(;i<clss.length;i++){
                        (function(i){
                            clss[i].addEventListener('click',function(){
                                customer_list(this.innerText)
                            })
            
                        })(i)
                    }*/
     }  
        if(d.pxy.existPrev){
            let prevBlock = document.createElement('span');
            prevBlock.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;');
            prevBlock.textContent="<";
            blocks.prepend(prevBlock);
        }

        if(d.pxy.existNext){
            let nextBlock = document.createElement('span');
            nextBlock.setAttribute('style','display:inline-block;padding-right:20px;border: 1px solid black;');
            nextBlock.textContent=">";
            blocks.appendChild(nextBlock);
        }
    
         let clss = document.getElementsByClassName('page-num');
    }
   };
   xhr.send();
}

function customer_list_form(){
  return '<h2>고객 목록</h2>'
  +'<table id="customer-table">'
  +'  <tr>'
    +'  <th>아이디</th>'
    +'  <th>고객명</th>'
    +'  <th>주민번호</th>'
    +'  <th>전화번호</th>'
    +'  <th>도시</th>'
  +'  </tr><tbody id="tbody"></tbody>'
  +'</table>';
}
    function count (){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'customers/count', true);
        xhr.onload=()=>{
            if(xhr.readyState===4 && xhr.status === 200){
                alert('성공');
                let wrapper = document.getElementById('wrapper');
                wrapper.innerHTML = '총 고객수 : <h1>'+xhr.responseText+'</h1>'
            }
        }
        xhr.send();
}    
