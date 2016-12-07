$(document).ready(function() {
 
  $('[data-toggle="tooltip"]').tooltip(); 
  var $1 = $("#1");
  var $2 = $("#2");
  var $3 = $("#3");
  var $4 = $("#4");
  var delay = 400;
  var x = 0;
  var hs = 0;
  var playerplay = [];
  var level = 1;
  var playermoves = 0;
  var plays = [];
  var audios = ["http://s1download-universal-soundbank.com/mp3/sounds/20839.mp3"," http://s1download-universal-soundbank.com/mp3/sounds/20842.mp3", "http://s1download-universal-soundbank.com/mp3/sounds/20842.mp3", "http://s1download-universal-soundbank.com/mp3/sounds/20841.mp3"];

  $(".play").off('click').on('click', function() {
    var audio = new Audio(" http://s1download-universal-soundbank.com/mp3/sounds/20856.mp3");
   audio.play();
    $(audio).on("ended", function() {
    startGame();
});
       
    // timer = setInterval(startGame, delay);

    $("#off").off('click').on('click', function() {
      //console.log(timer);
      x = 0;

      playerplay = [];
      level = 1;
      playermoves = 0;
      plays = [];
     var audio = new Audio(" http://s1download-universal-soundbank.com/mp3/sounds/20856.mp3");
   audio.play();
    $(audio).on("ended", function() {
    startGame();
});
    });

  });

  function playerturn() {
   
    $(".board").off('click').on('click', function() {
 
      playermoves++;

      // console.log(playermoves < level, "level " + level);

      playerplay.push("#" + $(this).attr("id"));
      if (playerplay.length == level) {

//         console.log(playerplay, playermoves, "PLAYER INPUT");

//         console.log(arraysEqual(playerplay, plays), "EQUAL ARRAYS");

        if (arraysEqual(playerplay, plays)) {
          console.log("NEXT LEVEL");
          playermoves = 0;
          playerplay = [];
          if(level==14){
            delay=-300;
          }else if(level==20){
            var audio = new Audio("http://s1download-universal-soundbank.com/mp3/sounds/10968.mp3");
            $("h1").text("YOU WIN!");
   audio.play();
            
          }
          level++;

          // timer = setInterval(startGame, delay);

          startGame();

        } else {
          
           x = 0;

      playerplay = [];
      level = 1;
      playermoves = 0;
      plays = [];
          $(".score").text("You Lost!");
         var audio = new Audio(" http://s1download-universal-soundbank.com/mp3/sounds/12588.mp3");
     audio.play();
    $(audio).on("ended", function() {
    startGame();
});
          
  
      
        }

      }

    });

  }

  function startGame() {
     $(".score").text("Level: " + level);
    $("h1").text("Simon Game!");
    event.stopPropagation();
    console.log(x < level, "stargamelevel " + level, "X " + x);

    if (x < level) {
      x++;
      var move = Math.floor(Math.random() * 4 + 1);
      plays.push("#" + move);
      console.log(plays, x);
      animate(plays);
      startGame();

    } else {
       
      // clearInterval(timer);
      playerturn();
    }

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function animate(plays) {
    var i = 0;
    var interval = setInterval(function() {
      retry(plays[i]);
      i++;
      if (i >= plays.length) {
        clearInterval(interval);
      }
    }, delay*2);
  }

  function retry(x) {
    
    aux = x.replace(/\D/g,'');
    $(x).addClass("highlight");
    var audio = new Audio(audios[(aux)-1]);
   audio.play();
    window.setTimeout(function() {
      $(x).removeClass('highlight');
    }, delay+200);

  }

  //   function animate(x, i) {
  //       $(x).addClass("highlight") 
  //     window.setTimeout(function() {
  //  $(x).removeClass('highlight');
  //  }, delay);

  //  // console.log("animating",i,(delay+(delay*i)),x);
  //  // $(x).delay(delay+(delay*i)).queueAddClass("highlight").delay(delay).queueRemoveClass("highlight")

  //   }

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }

    return true;
  }

  $.fn.queueAddClass = function(className) {
    this.queue('fx', function(next) {
      $(this).addClass(className);
      next();
    });
    return this;
  };

  $.fn.queueRemoveClass = function(className) {
    this.queue('fx', function(next) {
      $(this).removeClass(className);
      next();
    });
    return this;
  };

});