//Hàm tạo giá trị ngẫu nhiên red/green/yellow/blue
function rng(){
  var nums=Math.floor(Math.random()*4+1);
  switch (nums)
  {
    case 1:
      return "red";
      break;
    case 2:
      return "green";
      break;
    case 3:
      return "yellow";
      break;
    case 4:
      return "blue";
      break;
    default:
      break;
  }
};


var score = 0;
var sequence = [];

var begin=1; //biến xác định khai cuộc
var iteration=0; //biến xác định lượt click (để so khớp với mảng)
$(".btn").click(function()
  {
    $(this).animate({opacity: 0.5}, 200);
    $(this).animate({opacity: 1.0}, 100);
    $(this).animate({opacity: 1.0}, 300);
    //Kiểm tra đây có phải lượt click đầu tiên của lượt chơi mới không
    if (begin===1)
      {
        playSound(this.id);
        sequence=[];
        sequence.push(this.id);
        sequence.push(rng());
        score=0;
        $("#level-title").text("Score:  "+score);
        seqAnimate();
        begin=0;
      }
    //Nếu vẫn đang ở lượt cũ thì gọi hàm so khớp lượt click này có trùng khớp với mảng hiện hành
    else if ((this.id===sequence[iteration])&&!((iteration+1)===sequence.length))
      {
        playSound(this.id);
        iteration=iteration+1;
      }
    //Hoàn thành đúng theo mảng, level tiếp theo:
    else if ((this.id===sequence[iteration])&&((iteration+1)===sequence.length))
      {
        playSound(this.id);
        iteration=0;
        score=score+1;
        $("#level-title").text("Score:  "+score);
        sequence.push(rng());
        seqAnimate();
      }
    //game over
    else {
      playSound("wrong");
      $("#level-title").text("Game over! Your score is:  "+score);
      begin=1;

    };
  });

//Hàm animate mảng hiện hành
var i=0; //biến dành cho hàm seqAnimate, tự gán value = 0 khi kết thúc hàm
function seqAnimate()
{
  setTimeout(function(){
    playSound($("#"+sequence[i]).attr("id"));
    $("#"+sequence[i]).animate({opacity: 0.5}, 200);
    $("#"+sequence[i]).animate({opacity: 1.0}, 100);
    i++;
    if (i<sequence.length){seqAnimate();}
    else {i=0};
  }, 1000);
};


//âm thanh
function playSound(key){
  switch (key)
  {
    case ("blue"):
      var tom1 = new Audio("sounds/blue.mp3");
      tom1.play();
      break;
    case ("green"):
      var tom1 = new Audio("sounds/green.mp3");
      tom1.play();
      break;
    case ("red"):
      var tom1 = new Audio("sounds/red.mp3");
      tom1.play();
      break;
    case ("yellow"):
      var tom1 = new Audio("sounds/yellow.mp3");
      tom1.play();
      break;
    case ("wrong"):
      var tom1 = new Audio("sounds/wrong.mp3");
      tom1.play();
      break;
    default:
  }
}
