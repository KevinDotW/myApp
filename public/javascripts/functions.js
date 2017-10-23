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

/*姓名编码 */
function name_draw()
{   
    var mx=30;
    var my=30;

    var canvas = document.getElementById("canv");

    var cxt = canvas.getContext("2d"); 
        
    cxt.beginPath();
    cxt.beginPath();
    cxt.lineWidth = 2; 
    for(i=0;i<15;i++)
    {
        cxt.moveTo(0,my);
        cxt.lineTo(480,my);
        my=my+30
    }
    for(j=0;j<15;j++)
    {
        cxt.moveTo(mx,0);
        cxt.lineTo(mx,480);
        mx=mx+30
    }               
    cxt.stroke();
}

function Point(x,y)
{
    this.x=x;
    this.y=y;
}

function NDraw()
{   
    name_draw();
    var inputfile = document.getElementById("fileinput").files[0];
    var reader = new FileReader();
    reader.readAsText(inputfile);
    reader.onload=function(e)
    {   
        var text=reader.result.split("\r\n");
   
        Lines=new Array();
        N=0;
        Lines[N]=new Array();

        var l=text.length;
        var judge=0;
        for(i=1;i<l-1;i++)
        {   
            
            if(text[i]!="END")
            {   
                if(text[i].length!=1)
                {
                var x;
                var y;
                x=text[i].split(",")[0];
                y=text[i].split(",")[1];
                Lines[N][judge]=new Point(x,y);
                judge=judge+1;
                }
            }
            else
            {
                judge=0;
                N=N+1;
                Lines[N]=new Array();
            }
        }
        var canvas = document.getElementById("canv");
        var cxt = canvas.getContext("2d");
        cxt.beginPath();
        cxt.lineWidth = 10;
        for(i=0;i<N+1;i++)
        {   
            var ll=Lines[i].length;
            for(j=0;j<ll-1;j++)
            {
                 
                cxt.moveTo((Lines[i][j].x)*30,(Lines[i][j].y)*30);
                cxt.lineTo((Lines[i][j+1].x)*30,(Lines[i][j+1].y)*30);
                
            }
        }
        cxt.stroke();
        
    }

}

/*姓名变换*/ 
function X8Draw()
{
     var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {
                 
            cxt.moveTo(480-(Lines[i][j].x)*30,(Lines[i][j].y)*30);
            cxt.lineTo(480-(Lines[i][j+1].x)*30,(Lines[i][j+1].y)*30);
                
        }
    }
        cxt.stroke();
}

function Y8Draw()
{
     var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {
            cxt.moveTo((Lines[i][j].x)*30,480-(Lines[i][j].y)*30);
            cxt.lineTo((Lines[i][j+1].x)*30,480-(Lines[i][j+1].y)*30);
                
        }
    }
        cxt.stroke();
}

function BLDraw()
{
     var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {
            cxt.moveTo((Lines[i][j].x)*30*0.5,(Lines[i][j].y)*30*0.5);
            cxt.lineTo((Lines[i][j+1].x)*30*0.5,(Lines[i][j+1].y)*30*0.5);
                
        }
    }
        cxt.stroke();
}

function PYDraw()
{
    var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {
            cxt.moveTo((Lines[i][j].x)*30+60,(Lines[i][j].y)*30);
            cxt.lineTo((Lines[i][j+1].x)*30+60,(Lines[i][j+1].y)*30);
                
        }
    }
        cxt.stroke();
}

function XZDraw()
{
    var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {   
            a=(Lines[i][j].x)*30-240;
            b=(Lines[i][j].y)*30-240;
            a1=(Lines[i][j+1].x)*30-240;
            b1=(Lines[i][j+1].y)*30-240;
            cxt.moveTo(a*0.5-b*1.73/2+240,a*1.73/2+b*0.5+240);
            cxt.lineTo(a1*0.5-b1*1.73/2+240,a1*1.73/2+b1*0.5+240);
        }
    }
        cxt.stroke();
}

function ZXDraw()
{
     var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {   
                cxt.moveTo((Lines[i][j].x)*30+(Lines[i][j].y)*0.27*30,(Lines[i][j].y)*30);
                cxt.lineTo((Lines[i][j+1].x)*30+(Lines[i][j+1].y)*0.27*30,(Lines[i][j+1].y)*30);
            
        }
    }
        cxt.stroke();
}

function SJDraw()
{
     var canvas = document.getElementById("canv");
     var cxt = canvas.getContext("2d");
     cxt.clearRect(0,0,480,480);
     name_draw()
     cxt.beginPath();
     cxt.lineWidth = 10;
     for(i=0;i<N+1;i++)
     {   
        var ll=Lines[i].length;
        for(j=0;j<ll-1;j++)
        {   
                cxt.moveTo((Lines[i][j].x)*30,(Lines[i][j].y)*30-(Lines[i][j].x)*30*0.27);
                cxt.lineTo((Lines[i][j+1].x)*30,(Lines[i][j+1].y)*30-(Lines[i][j+1].x)*30*0.27);
            
        }
    }
        cxt.stroke();
}




/*最佳工作序列*/
function toRoute(number,route)
{   
    route[0]=0;
    var i;
    for(i=b;i<Number(number);i++)
    {   
        e=e+1;  
        b=i;    
        route[e]=b;
        b=b+1;
        toRoute(number,route)
    }
    var l=route.length;
    if(route[l-1]==Number(number)-1)
    {
        var j;
        for(j=0;j<l;j++)
        {
            routes[N][j]=route[j];
        }
        N=N+1;
        routes[N]=new Array();
        route.pop();
        route.pop();
        e=e-2;
        b=b-1;
    }
}

function toValue()
{
    var l=routes.length-1;
    var rl;
    var n=0;
    while(n<l)
    {   
        var svalue=0;
        var stime=0;
        var sdate=0;
        
        rl=routes[n].length;
        for(j=1;j<rl;j++)
        {
            stime=stime+goods[routes[n][j]].time;
            sdate=goods[routes[n][j]].date;
            if(sdate>=stime)
            {
                svalue=svalue+goods[routes[n][j]].value;
            }
            else
            {
                svalue=0;
                break;
            }
            
        }
        routes[n][0]=svalue;
        n=n+1;
    }
}

function bestSq()
{   
    number = document.getElementsByName("p1")[0].value;
    nid = document.getElementsByName("p2")[0].value;
    ntime = document.getElementsByName("p3")[0].value;
    ndate = document.getElementsByName("p4")[0].value;
    nvalue = document.getElementsByName("p5")[0].value;

    goods=new Array();
    routes=new Array();
    route=new Array();
    N=0;
    routes[N]=new Array();
    e=0;
    b=0;
   
    idArray=nid.split(',');
    timeArray=ntime.split(',');
    dateArray=ndate.split(',');
    valueArray=nvalue.split(',');
    
    for(i=0;i<Number(number);i++)
    {
         goods[i]=
         {
             "id":idArray[i],
             "time":Number(timeArray[i]),
             "date":Number(dateArray[i]),
             "value":Number(valueArray[i])
        };
    }
    
    for(i=0;i<(Number(number)-1);i++)
    {
        var min=goods[i];
        for(j=i+1;j<Number(number);j++)
        {
            if(min.date>goods[j].date)
            {
                min=goods[j];
                goods[j]=goods[i];
                goods[i]=min;
            }
        }
    }
    
    toRoute(number,route);
    toValue();
    
    var sl=routes.length;
    var bestid=0;
    var best=new Array();
    var max=routes[0][0];
    for(i=1;i<sl;i++)
    {
        if(max<routes[i][0])
        {
            max=routes[i][0];
            bestid=i;
        }
    }
    var bl=routes[bestid].length;
    for(j=1;j<bl;j++)
    {   
        var q=routes[bestid][j]
        best[j-1]=goods[q].id;
    }
    
    document.getElementsByName("a1")[0].value=best;
    document.getElementsByName("a2")[0].value=routes[bestid][0];
    document.getElementById("output").style.display= "block";
    
}



