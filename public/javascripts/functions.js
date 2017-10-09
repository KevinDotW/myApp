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


/*跳马问题*/
function board_draw()
{   
    document.getElementById("canv").width=(document.getElementById("inputn").value-1)*80;
    document.getElementById("canv").height=(document.getElementById("inputm").value-1)*80;
    var mm=document.getElementById("inputm").value;
    var nn=document.getElementById("inputn").value;
    var mx=80;
    var my=80;

    var canvas = document.getElementById("canv");
    var box = canvas.getBoundingClientRect();  


    var cxt = canvas.getContext("2d");          
    cxt.beginPath();
    cxt.lineWidth = 2; 
    for(i=0;i<mm-2;i++)
    {
        cxt.moveTo(0,my);
        cxt.lineTo((document.getElementById("inputn").value-1)*80,my);
        my=my+80
    }
    for(j=0;j<nn-2;j++)
    {
        cxt.moveTo(mx,0);
        cxt.lineTo(mx,(document.getElementById("inputm").value-1)*80);
        mx=mx+80
    }               
    cxt.stroke();
}

function step(x,y)
{
    this.x=x;
    this.y=y;
}

function toResult()
{   
    board_draw()
    var steps=
    {
        step_one:[1,2],
        step_two:[2,1],
        step_three:[2,-1],
        step_four:[1,-2],
        step_five:[-1,-2],
        step_six:[-2,-1],
        step_seven:[-2,1],
        step_eight:[-1,2]
    }

    m=Number(document.getElementById("inputm").value); //行数
    n=Number(document.getElementById("inputn").value); //列数
    bx=Number(document.getElementById("inputx").value); //起点X
    by=Number(document.getElementById("inputy").value); //起点Y

    num=0; //可行路径总数
    i=0; //深度
    kevin=0;

    var points=new Array();
    var point=new step(bx,by);
    points[i]=point;
    
    routes=new Array();

    vaultingHorse(m,n,routes,points,steps);

    var routeN=routes.length;
    for(qq=0;qq<routeN;qq++)
    {   
        var routeiN=routes[qq].length;
        var qqq=qq+1;
        document.getElementById("result").innerHTML+="<li style='color:red;' id="+qqq+">方案"+qqq+":</li>";
        for(pp=0;pp<routeiN;pp++)
        {
            document.getElementById("result").innerHTML+="("+routes[qq][pp].x+","+routes[qq][pp].y+")>>";
        }
        document.getElementById("result").innerHTML+="("+routes[0][0].x+","+routes[0][0].y+")<br>"
    }

    $(document).ready(function(){
        $("#result li").click(function(){
             a=Number($(this).attr("id"));
             fqq=routes[a-1].length;

                var canvas = document.getElementById("canv");
                var box = canvas.getBoundingClientRect();  


                var cxt = canvas.getContext("2d");          
                cxt.beginPath();
                cxt.strokeStyle="red";
                cxt.lineWidth = 2; 
                for(j=0;j<fqq-1;j++)
                {
                    cxt.moveTo((routes[a-1][j].x)*80,(routes[a-1][j].y)*80);
                    cxt.lineTo((routes[a-1][j+1].x)*80,(routes[a-1][j+1].y)*80);
                }
                cxt.moveTo((routes[a-1][j].x)*80,(routes[a-1][j].y)*80);
                cxt.lineTo((routes[0][0].x)*80,(routes[0][0].y)*80);   
                cxt.stroke();
        });
    });
}

function vaultingHorse(m,n,routes,points,steps)
{   

    
    var i2;
    var r2;    

    for(i2=0;i2<8;i2++)
    {
        r2=nextStep(m,n,bx,by,i2,points,steps);
        if(r2==1)
        {   

            var j2;
            var kk=points.length;
            routes[num]=new Array();
            for(j2=0;j2<kk;j2++)
            {
                routes[num][j2]=points[j2];
            }
            num=num+1;

        }
        if(r2==2)
        {
            
        }
        if(r2==3)
        {   
            switch(i2)
            {
                case 0:bx=bx+steps.step_one[0];by=by+steps.step_one[1];break;
                case 1:bx=bx+steps.step_two[0];by=by+steps.step_two[1];break;
                case 2:bx=bx+steps.step_three[0];by=by+steps.step_three[1];break;
                case 3:bx=bx+steps.step_four[0];by=by+steps.step_four[1];break;
                case 4:bx=bx+steps.step_five[0];by=by+steps.step_five[1];break;
                case 5:bx=bx+steps.step_six[0];by=by+steps.step_six[1];break;
                case 6:bx=bx+steps.step_seven[0];by=by+steps.step_seven[1];break;
                case 7:bx=bx+steps.step_eight[0];by=by+steps.step_eight[1];break;
            }
            i=i+1;
            var point=new step(bx,by);
            points[i]=point;
            vaultingHorse(m,n,routes,points,steps)
        }
        if(r2==4)
        {
            
        }

     }
if(i>0)
{
    points.pop();
    bx=points[i-1].x;
    by=points[i-1].y;
    i=i-1;
}
}



function nextStep(m,n,x,y,j,points,steps)
{   
    var i1;
    var l=points.length;
    switch(j)
    {
        case 0:x=x+steps.step_one[0];y=y+steps.step_one[1];break;
        case 1:x=x+steps.step_two[0];y=y+steps.step_two[1];break;
        case 2:x=x+steps.step_three[0];y=y+steps.step_three[1];break;
        case 3:x=x+steps.step_four[0];y=y+steps.step_four[1];break;
        case 4:x=x+steps.step_five[0];y=y+steps.step_five[1];break;
        case 5:x=x+steps.step_six[0];y=y+steps.step_six[1];break;
        case 6:x=x+steps.step_seven[0];y=y+steps.step_seven[1];break;
        case 7:x=x+steps.step_eight[0];y=y+steps.step_eight[1];break;
    }
    if((x>=0 && x<n) && (y>=0 && y<m))
    {
        if((x==points[0].x) && (y==points[0].y))
        {
            return 1; //起点
        }
        else
        {
            for(i1=1;i1<l;i1++)
            {
                if((x==points[i1].x) && (y==points[i1].y))
                {
                    return 2;  //已知点
                }
            }
            return 3;  //可走点
        }
        
    }
    else
    {
        return 4;  //外界点
    }
}




