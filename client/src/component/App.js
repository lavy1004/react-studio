import React from 'react';
import { observer } from 'mobx-react';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;



$(document).ready(function(){
            
      $('.btn').on('click', function() {
        var res =$('#B').val() - $('#A').val() 
        $('#B').val(res);
        $('#A').val('0');
    })


 
    $.ajax({  
      type: "POST" 
      ,url: "https://kapi.kakao.com/v1/payment/approve"
      ,beforeSend : function(xhr){
        xhr.setRequestHeader("Authorization", "KakaoAK" + "64cc78493e65a800b2ca5fbb2294688d" ); 
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      }
      ,success:function(data){
          alert("성공");
      }
      ,error:function(data){
          alert("error");
      }
    });





})

@observer
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  render() {
    return (
      <div>
          <p>Test용 화면</p>
      </div>
    );
  }
}

export default App;
