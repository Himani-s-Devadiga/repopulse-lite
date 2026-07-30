"use client";


export default function HealthBreakdown({repo}:any){


const data=[

{
name:"⭐ Popularity",
value: repo.stargazers_count > 10000 ? 90 : 60
},

{
name:"👥 Community",
value: repo.contributorsCount > 50 ? 90 : 60
},

{
name:"📈 Activity",
value: repo.recentCommits > 20 ? 85 : 50
},

{
name:"🐛 Maintenance",
value: repo.openIssues < 1000 ? 80 : 50
}

];



return (

<div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">


<h3 className="text-xl font-semibold mb-5">

🧠 Health Breakdown

</h3>


{

data.map((item,index)=>(


<div key={index} className="mb-5">


<div className="flex justify-between">

<span>

{item.name}

</span>


<span>

{item.value}%

</span>


</div>



<div className="bg-slate-700 h-3 rounded-full mt-2">


<div

className="bg-blue-500 h-3 rounded-full"

style={{

width:`${item.value}%`

}}

/>


</div>


</div>


))


}


</div>


);


}