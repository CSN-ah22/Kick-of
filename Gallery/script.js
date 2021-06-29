var req = new XMLHttpRequest();
req.open("GET","./json/image_list.json");
req.onreadystatechange = function(){
    if(this.readyState == 4){
        /* console.log(this.response); */ //확인 출력용

        //json 데이터를 자바 스크립트 데이터로 변환
        var data = JSON.parse(this.response);

        for (var i=0; i<data.length; i++){

            var div = document.createElement("div"); //div태그를 만들어라
            div.setAttribute("class","image"); //div태그에 image란 class속성을 추가해라
            //<div class = "image"></div>

            var img = document.createElement("img");
            img.src = data[i]; // ./images/1.jpg~~

            //div안에 img태그 넣기
            div.appendChild(img);
            //<div class = "image"><img src="./images/1.jpg~~"></img></div>

            //body안에 한꺼번에 넣기
            document.body.appendChild(div);

            //클릭할때마다 켜졌다 꺼졌다 하는 효과
            div.onclick = function(){

                this.classList.toggle("image-selected"); //클래스 리스트 중에 매개변수로 들어간 값이 있으면 없애고 없으면 추가한다
                //아래 if문과 같은 기능

                /* if(this.getAttribute("class").indexOf("image-selected")==-1){//class안에 image-selected라는게 없으면
                    this.setAttribute("class","image image-selected");
                }else{//있다면
                    this.setAttribute("class","image");
                } */
                
            }
        
              div.onmouseover = function() {
                  var element = this;
                this.timerId = setTimeout(function() {
                  element.classList.add("image-magnified")
                }, 1000);  // 1초가 지나면 div 태그에 클래스 추가
              }
              //문제: 1초 딜레이 후에 클래스가 추가되는데 아래 remove가 먼저 실행되어버림 - clearTimeout() 해결
              div.onmouseout = function() {
                  clearTimeout(this.timerId);
                this.classList.remove("image-magnified");
              }

            
        }
    }
}
req.send();

function selectAll(btn) {
    var images = document.getElementsByClassName("image");//배열로 변환
    for(var i=0; i<images.length; i++) {
        if(btn.value == "선택해제"){
            images[i].classList.remove("image-selected"); // 클래스 삭제
        }else{
      images[i].classList.add("image-selected"); // 클래스 추가
        }
    }
    if(btn.value == "선택해제"){
        btn.value = "selectAll";
    }else{
        btn.value = "선택해제";
    }
    
  }

  function slideShow(btn){
      var images = document.getElementsByClassName("image");
      var index = 0;
     var intervalId = images[index].classList.add("image-magnified");
      setInterval(function(){
          //1초마다 주기적으로 실행
          images[index].classList.remove("image-magnified");//작게하고
          index++;
          if(index < images.length){
          images[index].classList.add("image-magnified");//크게하고
        }else{
            clearInterval(intervalId);
        }
      },1000);

  }