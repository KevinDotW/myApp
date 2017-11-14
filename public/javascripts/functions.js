function setfont() {
  var obj = document.getElementsByName("t1")[0].value;
  document.getElementById("msg").innerHTML = obj;

  var obj2 = document.getElementsByName("t2")[0].value;
  document.getElementById("msg").style.fontSize = obj2 + "px";

  var obj3 = document.getElementsByName("t3")[0].value;
  document.getElementById("msg").style.color = obj3;

  var obj4 = document.getElementsByName("font")[0].value;
  document.getElementById("msg").style.fontFamily = obj4;
}

function drawLine(sx, sy, ex, ey, c) {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.strokeStyle = c;
  cxt.lineWidth = 2;
  cxt.moveTo(sx, sy);
  cxt.lineTo(ex, ey);
  cxt.stroke();
}

function drawrect(sx, sy, ex, ey, c) {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.fillStyle = c;
  cxt.fillRect(sx, sy, ex, ey);
}

function drawrec(x, y, r, c) {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.fillStyle = c;
  cxt.beginPath();
  cxt.arc(x, y, r, 0, Math.PI * 2, true);
  cxt.closePath();
  cxt.fill();
}

function setimg() {
  document.getElementById("canv").width = document.getElementsByName(
    "t2"
  )[0].value;
  document.getElementById("canv").height = document.getElementsByName(
    "t3"
  )[0].value;
  var s = document.getElementsByName("s1")[0].value;
  var canvas = document.getElementById("canv");
  var box = canvas.getBoundingClientRect();

  l = box.left;
  t = box.top;
  w = canvas.width / box.width;
  h = canvas.height / box.height;

  var cxt = canvas.getContext("2d");
  cxt.beginPath();

  var c = document.getElementsByName("t1")[0].value;

  if (s == "直线") {
    var oX, oY;
    canvas.onmousedown = function(e) {
      oX = (e.pageX - l) * w;
      oY = (e.pageY - t) * h;
    };
    canvas.onmouseup = function(e1) {
      drawLine(oX, oY, (e1.pageX - l) * w, (e1.pageY - t) * h, c);
    };
  }

  if (s == "矩形") {
    var oX, oY;
    canvas.onmousedown = function(e) {
      oX = (e.pageX - l) * w;
      oY = (e.pageY - t) * h;
    };
    canvas.onmouseup = function(e1) {
      drawrect(oX, oY, (e1.pageX - l) * w - oX, (e1.pageY - t) * h - oY, c);
    };
  }

  if (s == "圆形") {
    var oX, oY;
    canvas.onmousedown = function(e) {
      oX = (e.pageX - l) * w;
      oY = (e.pageY - t) * h;
    };
    canvas.onmouseup = function(e1) {
      sw = ((e1.pageX - l) * w + oX) / 2;
      sh = ((e1.pageY - t) * h + oY) / 2;
      a = (e1.pageX - l) * w - oX;
      b = (e1.pageY - t) * h - oY;
      x = a * a + b * b;
      r = Math.sqrt(x) / 2;
      drawrec(sw, sh, r, c);
    };
  }
}

/*跳马问题*/
function board_draw() {
  document.getElementById("canv").width =
    (document.getElementById("inputn").value - 1) * 80;
  document.getElementById("canv").height =
    (document.getElementById("inputm").value - 1) * 80;
  var mm = document.getElementById("inputm").value;
  var nn = document.getElementById("inputn").value;
  var mx = 80;
  var my = 80;

  var canvas = document.getElementById("canv");
  var box = canvas.getBoundingClientRect();

  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 2;
  for (i = 0; i < mm - 2; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo((document.getElementById("inputn").value - 1) * 80, my);
    my = my + 80;
  }
  for (j = 0; j < nn - 2; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, (document.getElementById("inputm").value - 1) * 80);
    mx = mx + 80;
  }
  cxt.stroke();
}

function step(x, y) {
  this.x = x;
  this.y = y;
}

function toResult() {
  board_draw();
  var steps = {
    step_one: [1, 2],
    step_two: [2, 1],
    step_three: [2, -1],
    step_four: [1, -2],
    step_five: [-1, -2],
    step_six: [-2, -1],
    step_seven: [-2, 1],
    step_eight: [-1, 2]
  };

  m = Number(document.getElementById("inputm").value); //行数
  n = Number(document.getElementById("inputn").value); //列数
  bx = Number(document.getElementById("inputx").value); //起点X
  by = Number(document.getElementById("inputy").value); //起点Y

  num = 0; //可行路径总数
  i = 0; //深度
  kevin = 0;

  var points = new Array();
  var point = new step(bx, by);
  points[i] = point;

  routes = new Array();

  vaultingHorse(m, n, routes, points, steps);

  var routeN = routes.length;
  for (qq = 0; qq < routeN; qq++) {
    var routeiN = routes[qq].length;
    var qqq = qq + 1;
    document.getElementById("result").innerHTML +=
      "<li style='color:red;' id=" + qqq + ">方案" + qqq + ":</li>";
    for (pp = 0; pp < routeiN; pp++) {
      document.getElementById("result").innerHTML +=
        "(" + routes[qq][pp].x + "," + routes[qq][pp].y + ")>>";
    }
    document.getElementById("result").innerHTML +=
      "(" + routes[0][0].x + "," + routes[0][0].y + ")<br>";
  }

  $(document).ready(function() {
    $("#result li").click(function() {
      a = Number($(this).attr("id"));
      fqq = routes[a - 1].length;

      var canvas = document.getElementById("canv");
      var box = canvas.getBoundingClientRect();

      var cxt = canvas.getContext("2d");
      cxt.beginPath();
      cxt.strokeStyle = "red";
      cxt.lineWidth = 2;
      for (j = 0; j < fqq - 1; j++) {
        cxt.moveTo(routes[a - 1][j].x * 80, routes[a - 1][j].y * 80);
        cxt.lineTo(routes[a - 1][j + 1].x * 80, routes[a - 1][j + 1].y * 80);
      }
      cxt.moveTo(routes[a - 1][j].x * 80, routes[a - 1][j].y * 80);
      cxt.lineTo(routes[0][0].x * 80, routes[0][0].y * 80);
      cxt.stroke();
    });
  });
}

function vaultingHorse(m, n, routes, points, steps) {
  var i2;
  var r2;

  for (i2 = 0; i2 < 8; i2++) {
    r2 = nextStep(m, n, bx, by, i2, points, steps);
    if (r2 == 1) {
      var j2;
      var kk = points.length;
      routes[num] = new Array();
      for (j2 = 0; j2 < kk; j2++) {
        routes[num][j2] = points[j2];
      }
      num = num + 1;
    }
    if (r2 == 2) {
    }
    if (r2 == 3) {
      switch (i2) {
        case 0:
          bx = bx + steps.step_one[0];
          by = by + steps.step_one[1];
          break;
        case 1:
          bx = bx + steps.step_two[0];
          by = by + steps.step_two[1];
          break;
        case 2:
          bx = bx + steps.step_three[0];
          by = by + steps.step_three[1];
          break;
        case 3:
          bx = bx + steps.step_four[0];
          by = by + steps.step_four[1];
          break;
        case 4:
          bx = bx + steps.step_five[0];
          by = by + steps.step_five[1];
          break;
        case 5:
          bx = bx + steps.step_six[0];
          by = by + steps.step_six[1];
          break;
        case 6:
          bx = bx + steps.step_seven[0];
          by = by + steps.step_seven[1];
          break;
        case 7:
          bx = bx + steps.step_eight[0];
          by = by + steps.step_eight[1];
          break;
      }
      i = i + 1;
      var point = new step(bx, by);
      points[i] = point;
      vaultingHorse(m, n, routes, points, steps);
    }
    if (r2 == 4) {
    }
  }
  if (i > 0) {
    points.pop();
    bx = points[i - 1].x;
    by = points[i - 1].y;
    i = i - 1;
  }
}

function nextStep(m, n, x, y, j, points, steps) {
  var i1;
  var l = points.length;
  switch (j) {
    case 0:
      x = x + steps.step_one[0];
      y = y + steps.step_one[1];
      break;
    case 1:
      x = x + steps.step_two[0];
      y = y + steps.step_two[1];
      break;
    case 2:
      x = x + steps.step_three[0];
      y = y + steps.step_three[1];
      break;
    case 3:
      x = x + steps.step_four[0];
      y = y + steps.step_four[1];
      break;
    case 4:
      x = x + steps.step_five[0];
      y = y + steps.step_five[1];
      break;
    case 5:
      x = x + steps.step_six[0];
      y = y + steps.step_six[1];
      break;
    case 6:
      x = x + steps.step_seven[0];
      y = y + steps.step_seven[1];
      break;
    case 7:
      x = x + steps.step_eight[0];
      y = y + steps.step_eight[1];
      break;
  }
  if (x >= 0 && x < n && (y >= 0 && y < m)) {
    if (x == points[0].x && y == points[0].y) {
      return 1; //起点
    } else {
      for (i1 = 1; i1 < l; i1++) {
        if (x == points[i1].x && y == points[i1].y) {
          return 2; //已知点
        }
      }
      return 3; //可走点
    }
  } else {
    return 4; //外界点
  }
}

/*姓名编码 */
function name_draw() {
  var mx = 30;
  var my = 30;

  var canvas = document.getElementById("canv");

  var cxt = canvas.getContext("2d");

  cxt.beginPath();
  cxt.beginPath();
  cxt.lineWidth = 2;
  for (i = 0; i < 15; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(480, my);
    my = my + 30;
  }
  for (j = 0; j < 15; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, 480);
    mx = mx + 30;
  }
  cxt.stroke();
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function NDraw() {
  name_draw();
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    var canvas = document.getElementById("canv");
    var cxt = canvas.getContext("2d");
    cxt.beginPath();
    cxt.lineWidth = 10;
    for (i = 0; i < N + 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        cxt.moveTo(Lines[i][j].x * 30, Lines[i][j].y * 30);
        cxt.lineTo(Lines[i][j + 1].x * 30, Lines[i][j + 1].y * 30);
      }
    }
    cxt.stroke();
  };
}

/*姓名变换*/

function X8Draw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      cxt.moveTo(480 - Lines[i][j].x * 30, Lines[i][j].y * 30);
      cxt.lineTo(480 - Lines[i][j + 1].x * 30, Lines[i][j + 1].y * 30);
    }
  }
  cxt.stroke();
}

function Y8Draw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      cxt.moveTo(Lines[i][j].x * 30, 480 - Lines[i][j].y * 30);
      cxt.lineTo(Lines[i][j + 1].x * 30, 480 - Lines[i][j + 1].y * 30);
    }
  }
  cxt.stroke();
}

function BLDraw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      cxt.moveTo(Lines[i][j].x * 30 * 0.5, Lines[i][j].y * 30 * 0.5);
      cxt.lineTo(Lines[i][j + 1].x * 30 * 0.5, Lines[i][j + 1].y * 30 * 0.5);
    }
  }
  cxt.stroke();
}

function PYDraw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      cxt.moveTo(Lines[i][j].x * 30 + 60, Lines[i][j].y * 30);
      cxt.lineTo(Lines[i][j + 1].x * 30 + 60, Lines[i][j + 1].y * 30);
    }
  }
  cxt.stroke();
}

function XZDraw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      a = Lines[i][j].x * 30 - 240;
      b = Lines[i][j].y * 30 - 240;
      a1 = Lines[i][j + 1].x * 30 - 240;
      b1 = Lines[i][j + 1].y * 30 - 240;
      cxt.moveTo(a * 0.5 - b * 1.73 / 2 + 240, a * 1.73 / 2 + b * 0.5 + 240);
      cxt.lineTo(
        a1 * 0.5 - b1 * 1.73 / 2 + 240,
        a1 * 1.73 / 2 + b1 * 0.5 + 240
      );
    }
  }
  cxt.stroke();
}

function ZXDraw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      cxt.moveTo(
        Lines[i][j].x * 30 + Lines[i][j].y * 0.27 * 30,
        Lines[i][j].y * 30
      );
      cxt.lineTo(
        Lines[i][j + 1].x * 30 + Lines[i][j + 1].y * 0.27 * 30,
        Lines[i][j + 1].y * 30
      );
    }
  }
  cxt.stroke();
}

function SJDraw() {
  var canvas = document.getElementById("canv");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 480, 480);
  name_draw();
  cxt.beginPath();
  cxt.lineWidth = 10;
  for (i = 0; i < N + 1; i++) {
    var ll = Lines[i].length;
    for (j = 0; j < ll - 1; j++) {
      cxt.moveTo(
        Lines[i][j].x * 30,
        Lines[i][j].y * 30 - Lines[i][j].x * 30 * 0.27
      );
      cxt.lineTo(
        Lines[i][j + 1].x * 30,
        Lines[i][j + 1].y * 30 - Lines[i][j + 1].x * 30 * 0.27
      );
    }
  }
  cxt.stroke();
}

/*最佳工作序列*/
function toRoute(number, route) {
  route[0] = 0;
  var i;
  for (i = b; i < Number(number); i++) {
    e = e + 1;
    b = i;
    route[e] = b;
    b = b + 1;
    toRoute(number, route);
  }
  var l = route.length;
  if (route[l - 1] == Number(number) - 1) {
    var j;
    for (j = 0; j < l; j++) {
      routes[N][j] = route[j];
    }
    N = N + 1;
    routes[N] = new Array();
    route.pop();
    route.pop();
    e = e - 2;
    b = b - 1;
  }
}

function toValue() {
  var l = routes.length - 1;
  var rl;
  var n = 0;
  while (n < l) {
    var svalue = 0;
    var stime = 0;
    var sdate = 0;

    rl = routes[n].length;
    for (j = 1; j < rl; j++) {
      stime = stime + goods[routes[n][j]].time;
      sdate = goods[routes[n][j]].date;
      if (sdate >= stime) {
        svalue = svalue + goods[routes[n][j]].value;
      } else {
        svalue = 0;
        break;
      }
    }
    routes[n][0] = svalue;
    n = n + 1;
  }
}

function bestSq() {
  number = document.getElementsByName("p1")[0].value;
  nid = document.getElementsByName("p2")[0].value;
  ntime = document.getElementsByName("p3")[0].value;
  ndate = document.getElementsByName("p4")[0].value;
  nvalue = document.getElementsByName("p5")[0].value;

  goods = new Array();
  routes = new Array();
  route = new Array();
  N = 0;
  routes[N] = new Array();
  e = 0;
  b = 0;

  idArray = nid.split(",");
  timeArray = ntime.split(",");
  dateArray = ndate.split(",");
  valueArray = nvalue.split(",");

  for (i = 0; i < Number(number); i++) {
    goods[i] = {
      id: idArray[i],
      time: Number(timeArray[i]),
      date: Number(dateArray[i]),
      value: Number(valueArray[i])
    };
  }

  for (i = 0; i < Number(number) - 1; i++) {
    var min = goods[i];
    for (j = i + 1; j < Number(number); j++) {
      if (min.date > goods[j].date) {
        min = goods[j];
        goods[j] = goods[i];
        goods[i] = min;
      }
    }
  }

  toRoute(number, route);
  toValue();

  var sl = routes.length;
  var bestid = 0;
  var best = new Array();
  var max = routes[0][0];
  for (i = 1; i < sl; i++) {
    if (max < routes[i][0]) {
      max = routes[i][0];
      bestid = i;
    }
  }
  var bl = routes[bestid].length;
  for (j = 1; j < bl; j++) {
    var q = routes[bestid][j];
    best[j - 1] = goods[q].id;
  }

  document.getElementsByName("a1")[0].value = best;
  document.getElementsByName("a2")[0].value = routes[bestid][0];
  document.getElementById("output").style.display = "block";
}

/*世界,WGS84*/

function WDTDraw() {
  var mx = 0;
  var my = 0;
  var canvas = document.getElementById("canvas");

  var cxt = canvas.getContext("2d");

  cxt.beginPath();
  cxt.lineWidth = 0.5;
  for (i = 0; i <= 36; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(720, my);
    my = my + 10;
  }
  for (j = 0; j <= 72; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, 360);
    mx = mx + 10;
  }
  cxt.stroke();
}

function WGS84Draw() {
  WDTDraw();
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N + 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        cxt.moveTo(
          Lines[i][j].x / 5 * 10 + 360,
          360 - Lines[i][j].y / 5 * 10 - 180
        );
        cxt.lineTo(
          Lines[i][j + 1].x / 5 * 10 + 360,
          360 - Lines[i][j + 1].y / 5 * 10 - 180
        );
      }
    }
    cxt.stroke();
  };
}

/*中国,BeiJing54*/

function CDTDraw() {
  var mx = 0;
  var my = 0;
  var canvas = document.getElementById("canvas");

  var cxt = canvas.getContext("2d");

  cxt.beginPath();
  cxt.lineWidth = 1;
  for (i = 0; i <= 14; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(640, my);
    my = my + 40;
  }
  for (j = 0; j <= 16; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, 560);
    mx = mx + 40;
  }
  cxt.stroke();
}

function BJ54Draw() {
  CDTDraw();
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N + 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        cxt.moveTo(
          Lines[i][j].x / 5 * 40 - 520,
          560 - (Lines[i][j].y / 5 * 40 + 40)
        );
        cxt.lineTo(
          Lines[i][j + 1].x / 5 * 40 - 520,
          560 - (Lines[i][j + 1].y / 5 * 40 + 40)
        );
      }
    }
    cxt.stroke();
  };
}

/*世界,墨卡托*/

function toMkt(w) {
  var a = 6378137;
  var b = 6356752.3142;
  var f = 1 / 298.257224;
  var e2 = 0.00669437999013;
  var e = Math.pow(e2, 1 / 2);
  var e12 = 0.006739496742227;
  var N = 6399698.90178;
  var K;
  var X;
  K = a * a / b / Math.sqrt(1 + e12);
  X =
    K *
    Math.log(
      Math.tan(Math.PI / 4 + w / 2 * Math.PI / 180) *
        Math.pow((1 - e * Math.sin(w)) / (1 + e * Math.sin(w)), e / 2)
    );
  return X;
}

function WMktDTDraw() {
  var w5 = 5;
  var X5 = toMkt(5);
  var mx = 0;
  var my = 0;
  var d = 85;
  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 0.5;
  cxt.strokeStyle = "black";
  for (i = 0; i < 34; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(576, my);
    var x1 = toMkt(d);
    var x2 = toMkt(d - 5);
    var X = (x1 - x2) / X5;
    d = d - 5;
    my = my + 8 * X;
  }
  cxt.moveTo(0, my);
  cxt.lineTo(576, my);

  for (j = 0; j <= 72; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, my);
    mx = mx + 8;
  }
  cxt.stroke();
}

function WMktDraw() {
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, 720, 540);
    WMktDTDraw();
    var Y = 2 * (toMkt(85) / toMkt(5)) * 8;
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N + 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        var k1 = toMkt(Lines[i][j].y) / toMkt(5);
        var k2 = toMkt(Lines[i][j + 1].y) / toMkt(5);
        cxt.moveTo(Lines[i][j].x / 5 * 8 + 288, Y - (k1 * 8 + Y / 2));
        cxt.lineTo(Lines[i][j + 1].x / 5 * 8 + 288, Y - (k2 * 8 + Y / 2));
      }
    }
    cxt.stroke();
  };
}

/*大圆航线*/
function DYline(w1, j1, w2, j2) {
  var num = 24; //航线间点数
  var R = 6371000;
  var φ1 = w1 / 180 * Math.PI;
  var φ2 = w2 / 180 * Math.PI;
  var λ1 = j1 / 180 * Math.PI;
  var λ2 = j2 / 180 * Math.PI;
  var Δφ = (w2 - w1) / 180 * Math.PI;
  var Δλ = (j2 - j1) / 180 * Math.PI;

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var DYlines = new Array();
  var n = 0;
  var point = new Point(j1, w1);
  DYlines[n] = point;
  n = n + 1;
  for (i = 1; i < 24; i++) {
    var aa = Math.sin((1 - i / num) * c) / Math.sin(c);
    var bb = Math.sin(i / num * c) / Math.sin(c);
    var x = aa * Math.cos(φ1) * Math.cos(λ1) + bb * Math.cos(φ2) * Math.cos(λ2);
    var y = aa * Math.cos(φ1) * Math.sin(λ1) + bb * Math.cos(φ2) * Math.sin(λ2);
    var z = aa * Math.sin(φ1) + bb * Math.sin(φ2);
    var ww = Math.atan2(z, Math.pow(x * x + y * y, 1 / 2)) * 180 / Math.PI;
    var jj = Math.atan2(y, x) * 180 / Math.PI;
    var point = new Point(jj, ww);
    DYlines[n] = point;
    n = n + 1;
  }
  var point = new Point(j2, w2);
  DYlines[n] = point;
  return DYlines;
}

/*大圆航线墨卡托*/
function DYlineMktDraw() {
  var DYlines = new Array();
  DYlines = DYline(39.915076, 116.403898, 48.863917, 2.333983);
  var len = DYlines.length;

  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  var Y = 2 * (toMkt(85) / toMkt(5)) * 8;
  cxt.beginPath();
  cxt.lineWidth = 2;
  cxt.strokeStyle = "red";
  for (i = 0; i < len - 1; i++) {
    var k1 = toMkt(DYlines[i].y) / toMkt(5);
    var k2 = toMkt(DYlines[i + 1].y) / toMkt(5);
    cxt.moveTo(DYlines[i].x / 5 * 8 + 288, Y - (k1 * 8 + Y / 2));
    cxt.lineTo(DYlines[i + 1].x / 5 * 8 + 288, Y - (k2 * 8 + Y / 2));
  }
  cxt.stroke();
}

/*大圆航线WGS84*/
function DYlineWgsDraw() {
  var DYlines = new Array();
  DYlines = DYline(39.915076, 116.403898, 48.863917, 2.333983);
  var len = DYlines.length;

  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 2;
  cxt.strokeStyle = "red";
  for (i = 0; i < len - 1; i++) {
    cxt.moveTo(DYlines[i].x / 5 * 10 + 360, 360 - DYlines[i].y / 5 * 10 - 180);
    cxt.lineTo(
      DYlines[i + 1].x / 5 * 10 + 360,
      360 - DYlines[i + 1].y / 5 * 10 - 180
    );
  }
  cxt.stroke();
}

/*北京54墨卡托*/
function CMktDTDraw() {
  var w5 = 5;
  var X5 = toMkt(5);
  var mx = 0;
  var my = 0;
  var d = 65;
  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 0.5;
  cxt.strokeStyle = "black";
  for (i = 0; i < 14; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(350, my);
    var x1 = toMkt(d);
    var x2 = toMkt(d - 5);
    var X = (x1 - x2) / X5;
    d = d - 5;
    my = my + 25 * X;
  }
  cxt.moveTo(0, my);
  cxt.lineTo(350, my);

  for (j = 0; j <= 14; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, my);
    mx = mx + 25;
  }
  cxt.stroke();
}

function CMktDraw() {
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, 720, 560);
    CMktDTDraw();
    var Y = toMkt(65) / toMkt(5) * 25 + 25;
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N + 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        var k1 = toMkt(Lines[i][j].y) / toMkt(5);
        var k2 = toMkt(Lines[i][j + 1].y) / toMkt(5);
        cxt.moveTo(Lines[i][j].x / 5 * 25 - 325, Y - (k1 * 25 + 25));
        cxt.lineTo(Lines[i][j + 1].x / 5 * 25 - 325, Y - (k2 * 25 + 25));
      }
    }
    cxt.stroke();
  };
}

/*兰伯特投影*/
function toLbt(L, B) {
  var a = 6378137;
  var e2 = 0.006693421622966;
  var e = Math.sqrt(e2);

  L = L * Math.PI / 180;
  B = B * Math.PI / 180;

  var b1 = 20 * Math.PI / 180;
  var b2 = 40 * Math.PI / 180;
  var l0 = 105 * Math.PI / 180;
  var b0 = 0;

  var m = Math.cos(B) / Math.sqrt(1 - e2 * Math.sin(B) * Math.sin(B));
  var mb1 = Math.cos(b1) / Math.sqrt(1 - e2 * Math.sin(b1) * Math.sin(b1));
  var mb2 = Math.cos(b2) / Math.sqrt(1 - e2 * Math.sin(b2) * Math.sin(b2));

  var t =
    Math.tan(Math.PI / 4 - B / 2) /
    Math.pow((1 - e * Math.sin(B)) / (1 + e * Math.sin(B)), e / 2);
  var t0 =
    Math.tan(Math.PI / 4 - b0 / 2) /
    Math.pow((1 - e * Math.sin(b0)) / (1 + e * Math.sin(b0)), e / 2);
  var tb1 =
    Math.tan(Math.PI / 4 - b1 / 2) /
    Math.pow((1 - e * Math.sin(b1)) / (1 + e * Math.sin(b1)), e / 2);
  var tb2 =
    Math.tan(Math.PI / 4 - b2 / 2) /
    Math.pow((1 - e * Math.sin(b2)) / (1 + e * Math.sin(b2)), e / 2);

  var n = Math.log(mb1 / mb2) / Math.log(tb1 / tb2);
  var F = mb1 / (n * Math.pow(tb1, n));

  var r = a * F * Math.pow(t, n);
  var r0 = a * F * Math.pow(t0, n);

  var theta = n * (L - l0);

  var X = r0 - r * Math.cos(theta);
  var Y = r * Math.sin(theta);

  var point = new Point(Y, X);
  return point;
}

function CLbtDTDraw() {
  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 0.5;
  cxt.strokeStyle = "black";

  var DTlines = new Array();
  var nx = 15;
  var ny = 15;
  var bw = 65;
  var bj = 70;
  for (i = 0; i < nx; i++) {
    DTlines[i] = new Array();
    for (j = 0; j < ny; j++) {
      var point = toLbt(bj, bw);
      DTlines[i][j] = point;
      bw = bw - 5;
    }
    bw = 65;
    bj = bj + 5;
  }
  for (i = 0; i < nx; i++) {
    for (j = 0; j < ny - 1; j++) {
      var x1 = (DTlines[i][j].x - 13700000) / 30000;
      var y1 = DTlines[i][j].y / 10000 / 70000 * 20000;
      var x2 = (DTlines[i][j + 1].x - 13700000) / 30000;
      var y2 = DTlines[i][j + 1].y / 10000 / 70000 * 20000;
      cxt.moveTo(x1 + 680, 260 - y1);
      cxt.lineTo(x2 + 680, 260 - y2);
    }
  }
  for (i = 0; i < ny; i++) {
    for (j = 0; j < nx - 1; j++) {
      var x1 = (DTlines[j][i].x - 13700000) / 30000;
      var y1 = DTlines[j][i].y / 10000 / 70000 * 20000;
      var x2 = (DTlines[j + 1][i].x - 13700000) / 30000;
      var y2 = DTlines[j + 1][i].y / 10000 / 70000 * 20000;
      cxt.moveTo(x1 + 680, 260 - y1);
      cxt.lineTo(x2 + 680, 260 - y2);
    }
  }
  cxt.stroke();
}

function CLbtDraw() {
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, 720, 560);
    CLbtDTDraw();
    /*var Y=toMkt(65)/toMkt(5)*25+25;*/
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N + 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        var point1 = toLbt(Lines[i][j].x, Lines[i][j].y);
        var point2 = toLbt(Lines[i][j + 1].x, Lines[i][j + 1].y);

        var x1 = (point1.x - 13700000) / 30000;
        var y1 = point1.y / 10000 / 70000 * 20000;
        var x2 = (point2.x - 13700000) / 30000;
        var y2 = point2.y / 10000 / 70000 * 20000;
        cxt.moveTo(x1 + 680, 260 - y1);
        cxt.lineTo(x2 + 680, 260 - y2);
      }
    }
    cxt.stroke();
  };
}

/*求江苏省各市面积(墨卡托)*/
function MktTo(Y, X) {
  var a = 6378137;
  var b = 6356752.3142;
  var e2 = 0.006693421622966;
  var e12 = 0.006739496742227;
  var e = Math.sqrt(e2);

  var B0 = 0;
  var L0 = 0;
  var k =
    a * a / b * Math.cos(B0) / Math.sqrt(1 + e12 * Math.cos(B0) * Math.cos(B0));

  var B, L, B1;
  var B = 0;

  L = Y / k + L0;

  for (var j = 0; ; j++) {
    B1 =
      Math.PI / 2 -
      2 *
        Math.atan(
          Math.exp(-X / k) *
            Math.exp(e / 2 * Math.log((1 - Math.sin(B)) / (1 + Math.sin(B))))
        );
    B = B1;
    if (Math.abs(B1 - B) < 0.000001) {
      break;
    }
  }

  L = L * 180 / Math.PI;
  B = B * 180 / Math.PI;

  var point = new Point(L, B);
  return point;
}

function toMPolygonArea(polygon) {
  var i, j;
  var area = 0;
  for (i = 0; i < polygon.length; i++) {
    j = (i + 1) % polygon.length;
    area += polygon[i].x * polygon[j].y;
    area -= polygon[i].y * polygon[j].x;
  }
  area /= 2;
  return Math.abs(area);
}

function toPolygonArea(polygon) {
  var a = 6378245;
  var i, j;
  var area = 0;
  for (i = 0; i < polygon.length; i++) {
    j = (i + 1) % polygon.length;
    var x1 =
      polygon[i].x / 180 * Math.PI * a * Math.cos(polygon[i].y / 180 * Math.PI);
    var y1 = polygon[i].y / 180 * Math.PI * a;
    var x2 =
      polygon[j].x / 180 * Math.PI * a * Math.cos(polygon[j].y / 180 * Math.PI);
    var y2 = polygon[j].y / 180 * Math.PI * a;
    area += x1 * y2;
    area -= y1 * x2;
  }
  area /= 2;
  return Math.abs(area);
}

function toMSumArea(polygons) {
  var l = polygons.length;
  var sumArea = new Array();
  var n = 0;
  for (i = 0; i < l; i++) {
    var eArea;
    var s = 0;
    switch (i) {
      case 1:
        s = s + toMPolygonArea(polygons[i]);
        break;
      case 2:
        s = s + toMPolygonArea(polygons[i]);
        break;
      case 3:
        s = s + toMPolygonArea(polygons[i]);
        break;
      case 4:
        s = s + toMPolygonArea(polygons[i]);
        break;
      case 5:
        s = s + toMPolygonArea(polygons[i]);
        break;
      case 6:
        eArea = toMPolygonArea(polygons[i]) - s;
        sumArea[n] = eArea;
        n = n + 1;
        break;
      default:
        eArea = toMPolygonArea(polygons[i]);
        sumArea[n] = eArea;
        n = n + 1;
        break;
    }
  }
  return sumArea;
}

function toSumArea(polygons) {
  var l = polygons.length;
  var sumArea = new Array();
  var n = 0;
  for (i = 0; i < l; i++) {
    var eArea;
    var s = 0;
    switch (i) {
      case 1:
        s = s + toPolygonArea(polygons[i]);
        break;
      case 2:
        s = s + toPolygonArea(polygons[i]);
        break;
      case 3:
        s = s + toPolygonArea(polygons[i]);
        break;
      case 4:
        s = s + toPolygonArea(polygons[i]);
        break;
      case 5:
        s = s + toPolygonArea(polygons[i]);
        break;
      case 6:
        eArea = toPolygonArea(polygons[i]) - s;
        sumArea[n] = eArea;
        n = n + 1;
        break;
      default:
        eArea = toPolygonArea(polygons[i]);
        sumArea[n] = eArea;
        n = n + 1;
        break;
    }
  }
  return sumArea;
}

function drawMDTArea() {
  var w5 = 5;
  var X5 = toMkt(5);
  var mx = 0;
  var my = 0;
  var d = 40;
  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 0.5;
  cxt.strokeStyle = "black";
  for (i = 0; i < 3; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(480, my);
    var x1 = toMkt(d);
    var x2 = toMkt(d - 5);
    var X = (x1 - x2) / X5;
    d = d - 5;
    my = my + 160 * X;
  }
  cxt.moveTo(0, my);
  cxt.lineTo(480, my);

  for (j = 0; j <= 3; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, my);
    mx = mx + 160;
  }
  cxt.stroke();
}

function drawDTArea() {
  var mx = 0;
  var my = 0;
  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.beginPath();
  cxt.lineWidth = 0.5;
  cxt.strokeStyle = "black";
  for (i = 0; i < 3; i++) {
    cxt.moveTo(0, my);
    cxt.lineTo(480, my);
    my = my + 160;
  }
  cxt.moveTo(0, my);
  cxt.lineTo(480, my);

  for (j = 0; j <= 3; j++) {
    cxt.moveTo(mx, 0);
    cxt.lineTo(mx, my);
    mx = mx + 160;
  }
  cxt.stroke();
}

function drawMArea() {
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];
          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    Lines.pop();
    Lines.pop();

    sumArea = new Array();
    sumArea = toMSumArea(Lines);

    var point;

    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, 720, 560);
    drawMDTArea();
    var Y = 560;
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N - 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        var x1 = Lines[i][j].x / 1200 - 10800;
        var x2 = Lines[i][j + 1].x / 1200 - 10800;
        var y1 = 560 - (Lines[i][j].y / 1200 - 2950);
        var y2 = 560 - (Lines[i][j + 1].y / 1200 - 2950);
        cxt.moveTo(x1, y1);
        cxt.lineTo(x2, y2);
      }
    }
    cxt.stroke();
  };
}

function drawArea() {
  var inputfile = document.getElementById("fileinput").files[0];
  var reader = new FileReader();
  reader.readAsText(inputfile);
  reader.onload = function(e) {
    var text = reader.result.split("\r\n");

    Lines = new Array();
    N = 0;
    Lines[N] = new Array();

    var l = text.length;
    var judge = 0;
    for (i = 1; i < l - 1; i++) {
      if (text[i] != "END") {
        if (text[i].split(",").length != 1) {
          var x;
          var y;
          x = text[i].split(",")[0];
          y = text[i].split(",")[1];

          var p = MktTo(x, y);
          x = p.x;
          y = p.y;

          Lines[N][judge] = new Point(x, y);
          judge = judge + 1;
        }
      } else {
        judge = 0;
        N = N + 1;
        Lines[N] = new Array();
      }
    }
    Lines.pop();
    Lines.pop();

    sumArea = new Array();
    sumArea = toSumArea(Lines);

    var point;

    var canvas = document.getElementById("canvas");
    var cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, 720, 560);
    drawDTArea();
    var Y = 560;
    cxt.beginPath();
    cxt.lineWidth = 0.5;
    for (i = 0; i < N - 1; i++) {
      var ll = Lines[i].length;
      for (j = 0; j < ll - 1; j++) {
        var x1 = (Lines[i][j].x / 5 - 23) * 240;
        var x2 = (Lines[i][j + 1].x / 5 - 23) * 240;
        var y1 = 560 - (Lines[i][j].y / 5 * 240 - 1280);
        var y2 = 560 - (Lines[i][j + 1].y / 5 * 240 - 1280);
        cxt.moveTo(x1, y1);
        cxt.lineTo(x2, y2);
      }
    }
    cxt.stroke();
  };
}

function getMArea() {
  var n = Number(document.getElementById("area1").value);
  document.getElementById("result1").innerHTML = "面积:" + sumArea[n];
  document.getElementById("result1").style.display = "block";
  document.getElementById("result2").style.display = "none";
}

function getArea() {
  var n = Number(document.getElementById("area2").value);
  document.getElementById("result2").innerHTML = "面积:" + sumArea[n];
  document.getElementById("result1").style.display = "none";
  document.getElementById("result2").style.display = "block";
}

/*地图压缩*/
function toLine(x1, y1, x2, y2) {
  var A, B, C;
  A = (y1 - y2) / Math.sqrt(Math.pow(y1 - y2, 2) + Math.pow(x1 - x2, 2));
  B = (x2 - x1) / Math.sqrt(Math.pow(y1 - y2, 2) + Math.pow(x1 - x2, 2));
  C =
    (x1 * y2 - x2 * y1) /
    Math.sqrt(Math.pow(y1 - y2, 2) + Math.pow(x1 - x2, 2));
  return [A, B, C];
}

function toDistance(x1, y1, A, B, C) {
  var distance;
  distance = Math.abs(A * x1 + B * y1 + C);
  return distance;
}

function toMax(line, A, B, C, rb1, re1) {
  var max = 0;
  var record = 0;
  var len = line.length;
  for (i = rb1 + 1; i < re1; i++) {
    var d = toDistance(line[i].x, line[i].y, A, B, C);
    if (d > max) {
      max = d;
      record = i;
    }
  }
  return [max, record];
}

function EDouglas_Peucker(line, rb, re) {
  var len1 = re - rb + 1;
  var bx, by, ex, ey;
  var A, B, C;
  var mmax;
  var record;
  bx = line[rb].x;
  by = line[rb].y;
  ex = line[re].x;
  ey = line[re].y;

  if (bx == ex && by == ey) {
    re = re - 1;
    ex = line[re].x;
    ey = line[re].y;
    len1 = len1 - 1;
  }

  [A, B, C] = toLine(bx, by, ex, ey);
  [mmax, record] = toMax(line, A, B, C, rb, re);

  if (len1 > 1 && judge == 0) {
    if (mmax < maxValue) {
      JNumber = JNumber + len1 - 2;
      var p1 = new Point(bx, by);
      newline[N].push(p1);
      var p2 = new Point(ex, ey);
      newline[N].push(p2);
    } else {
      judge = 0;
      EDouglas_Peucker(line, rb, record);
      judge = 2;
      EDouglas_Peucker(line, record, re);
    }
  } else if (len1 > 1 && judge == 2) {
    if (mmax < maxValue) {
      JNumber = JNumber + len1 - 2;
      var p2 = new Point(ex, ey);
      newline[N].push(p2);
    } else {
      judge = 0;
      EDouglas_Peucker(line, rb, record);
      judge = 2;
      EDouglas_Peucker(line, record, re);
    }
  } else if (len1 == 1 && judge == 0) {
    var p1 = new Point(bx, by);
    newline[N].push(p1);
    var p2 = new Point(ex, ey);
    newline[N].push(p2);
  } else if (len1 == 1 && judge == 2) {
    var p2 = new Point(ex, ey);
    newline[N].push(p2);
  }
}

function Douglas_Peucker() {
  var Nline = Lines.length - 1;
  maxValue = document.getElementById("maxValue").value;
  PNumber = 0;
  JNumber = 0;
  judge = 0;
  N = 0;
  newline = new Array();
  var i;

  for (i = 0; i < Nline; i++) {
    var ll = Lines[i].length;
    var bi = 0;
    var ei = ll - 1;
    newline[N] = new Array();
    PNumber = PNumber + Lines[i].length;
    EDouglas_Peucker(Lines[i], bi, ei);
    N = N + 1;
  }

  var canvas = document.getElementById("canvas");
  var cxt = canvas.getContext("2d");
  cxt.clearRect(0, 0, 720, 560);
  CLbtDTDraw();
  /*var Y=toMkt(65)/toMkt(5)*25+25;*/
  cxt.beginPath();
  cxt.lineWidth = 0.5;
  for (i = 0; i < newline.length; i++) {
    var ll = newline[i].length;
    for (j = 0; j < ll - 1; j++) {
      var point1 = toLbt(newline[i][j].x, newline[i][j].y);
      var point2 = toLbt(newline[i][j + 1].x, newline[i][j + 1].y);

      var x1 = (point1.x - 13700000) / 30000;
      var y1 = point1.y / 10000 / 70000 * 20000;
      var x2 = (point2.x - 13700000) / 30000;
      var y2 = point2.y / 10000 / 70000 * 20000;
      cxt.moveTo(x1 + 680, 260 - y1);
      cxt.lineTo(x2 + 680, 260 - y2);
    }
  }
  cxt.stroke();

  document.getElementById("result").innerText = "压缩率:" + JNumber / PNumber;
}

/*四叉树*/
function Morton(code, deep, value) {
  var code = this.code;
  var deep = this.deep;
  var value = this.value;
}

function toCut(bm, em, bn, en) {
  var i, j;
  var judge = Mortons[bm][bn];
  for (i = bm; i <= em; i++) {
    for (j = bn; i <= en; j++) {
      if (Mortons[i][j] != judge) {
        return false;
      }
    }
  }
  return true;
}

function toMortonValue(bm, em, bn, en, c, d, v) {
  var i, j;
  for (i = bm; i <= em; i++) {
    for (j = bn; i <= en; j++) {
      var m = new Morton(c, d, v);
      Mortons[i][j] = m;
    }
  }
}

function toMorton() {
  Mortons = [[1,1,1,1,2,2,3,3],
                 [1,1,1,1,2,2,3,3],
                 [1,1,1,1,4,4,5,5],
                 [1,1,1,1,4,4,5,5],
                 [6,6,7,8,13,13,14,14],
                 [6,6,9,10,13,13,14,14],
                 [11,11,12,12,15,16,19,19],
                 [11,11,12,12,17,18,19,19],
                ]
  N = 0;

  row = 0;
  col = 0;
  Trow=0;
  Tcol=0;

  MortonResult(0, 7, 0, 7);

}

function MortonResult(bm, em, bn, en) {
  var i, j;
  var Ci = (em - bm + 1) / 2;
  var Cj = (en - bn + 1) / 2;
  var deep = 0; //记录深度

  if (Ci >= 1 && Cj >= 1) 
  { 
    for (i = 0; i < 2; i++) 
    {
      for (j = 0; j < 2; j++) 
      {
        var code, value, mor;
        if (i == 0 && j == 0) 
        {
          if (toCut(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj)) 
          {
            code = Number(Trow.toSting(2)) * 2 + Number(Tcol.toSting(2));
            value = Mortons[bm, bn];
            toMortonValue(bm, em, bn, en, code, deep, value);
          } 
          else 
          {
            deep = deep + 1;
            row=row+1;
            col=col+1;
            MortonResult(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj);
          }
        }
        else if (i == 0 && j == 1) 
        {
           Tcol=Tcol+1;
           if (toCut(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj)) 
           {
            code = Number(Trow.toSting(2)) * 2 + Number(Tcol.toSting(2));
            value = Mortons[bm, bn];
            toMortonValue(bm, em, bn, en, code, deep, value);
           } 
           else 
           {
            deep = deep + 1;
            col=col+1;
            MortonResult(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj);
           }
           Trow=Trow+1;
        } 
        else if (i == 1 && j == 0) 
        {
          Tcol=Tcol+1;
           if (toCut(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj)) 
           {
            code = Number(Trow.toSting(2)) * 2 + Number(Tcol.toSting(2));
            value = Mortons[bm, bn];
            toMortonValue(bm, em, bn, en, code, deep, value);
           } 
           else 
           {
            deep = deep + 1;
            row=row+1;
            MortonResult(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj);
           }
        } 
        else if (i == 1 && j == 1) 
        {
           if (toCut(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj)) 
           {
            code = Number(Trow.toSting(2)) * 2 + Number(Tcol.toSting(2));
            value = Mortons[bm, bn];
            toMortonValue(bm, em, bn, en, code, deep, value);
           } 
           else 
           {
            deep = deep + 1;
            MortonResult(Ci * i, Ci * i + Ci, Cj * j, Cj * j + Cj);
           }
        }
      }
    }
  }
}
