function setfont()
{
    var obj=document.getElementsByName("t1")[0].value;
    document.getElementById("msg").innerHTML=obj;

    var obj2=document.getElementsByName("t2")[0].value;
    document.getElementById("msg").style.fontSize=obj2+"px";

    var obj3=document.getElementsByName("t3")[0].value;
    document.getElementById("msg").style.color=obj3;
    
    var obj4=document.getElementsByName("font")[0].value;
    document.getElementById("msg").style.fontFamily=obj4;
}

function drawLine(sx,sy,ex,ey,c)
{   
    var canvas = document.getElementById("canv");  
    var cxt = canvas.getContext("2d");  
    cxt.strokeStyle = c;
    cxt.lineWidth = 2;             
    cxt.moveTo(sx,sy);
    cxt.lineTo(ex,ey);
    cxt.stroke();
}

function drawrect(sx,sy,ex,ey,c)
{
    var canvas = document.getElementById("canv");  
    var cxt = canvas.getContext("2d"); 
    cxt.fillStyle=c;
    cxt.fillRect(sx,sy,ex,ey);
}

function drawrec(x,y,r,c)
{
   var canvas=document.getElementById("canv");
   var cxt=canvas.getContext("2d");
   cxt.fillStyle=c;
   cxt.beginPath();
   cxt.arc(x,y,r,0,Math.PI*2,true);
   cxt.closePath();
   cxt.fill();
}
    
function setimg()
{   
    document.getElementById("canv").width=document.getElementsByName("t2")[0].value;
    document.getElementById("canv").height=document.getElementsByName("t3")[0].value;
    var s=document.getElementsByName("s1")[0].value;
    var canvas = document.getElementById("canv");
    var box = canvas.getBoundingClientRect();  

    l=box.left;
    t=box.top;
    w=canvas.width/box.width;
    h=canvas.height/box.height;

    var cxt = canvas.getContext("2d");          
    cxt.beginPath();
    
    var c=document.getElementsByName("t1")[0].value
  

    if(s=="直线")
    {
    var oX,oY;
    canvas.onmousedown = function(e)
    {   
        oX = (e.pageX-l)*w;
        oY = (e.pageY-t)*h;              
    } 
    canvas.onmouseup= function(e1)
    {
        drawLine(oX,oY,(e1.pageX-l)*w,(e1.pageY-t)*h,c);
    }
    }

    if(s=="矩形")
    {
    var oX,oY;
    canvas.onmousedown = function(e)
    {   
        oX = (e.pageX-l)*w;
        oY = (e.pageY-t)*h;              
    } 
    canvas.onmouseup= function(e1)
    {
        drawrect(oX,oY,(e1.pageX-l)*w-oX,(e1.pageY-t)*h-oY,c);
    }
    }

    if(s=="圆形")
    {
    var oX,oY;
    canvas.onmousedown = function(e)
    {   
        oX = (e.pageX-l)*w;
        oY = (e.pageY-t)*h;              
    } 
    canvas.onmouseup= function(e1)
    {
        sw=((e1.pageX-l)*w+oX)/2;
        sh=((e1.pageY-t)*h+oY)/2;
        a=(e1.pageX-l)*w-oX;
        b=(e1.pageY-t)*h-oY;
        x=a*a+b*b
        r=Math.sqrt(x)/2;
        drawrec(sw,sh,r,c);
    }
    }       

    
   
    
      


}
