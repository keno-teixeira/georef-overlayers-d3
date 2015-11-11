jQuery(document).ready(function(){
    var contador = 0;
  $('.botao-tool').click(function(){
    if(contador == 0){
    $('.mask-tool').css("left","0px");
    contador =  1;
  } else {
      $('.mask-tool').css("left","-200px");
      contador = 0;
    }
});
});
