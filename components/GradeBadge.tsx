"use client";


export default function GradeBadge({score}:any){


let grade="";
let message="";


if(score>=90){

grade="A+";
message="Excellent Repository";

}

else if(score>=75){

grade="A";
message="Healthy Repository";

}

else if(score>=60){

grade="B";
message="Good Repository";

}

else if(score>=40){

grade="C";
message="Needs Attention";

}

else{

grade="D";
message="Poor Maintenance";

}



return (

<div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">


<div className="text-6xl font-bold text-blue-500">

{grade}

</div>


<h3 className="text-xl mt-3 font-semibold">

{message}

</h3>


<p className="text-slate-400 mt-2">

AI Repository Rating

</p>


</div>

);


}