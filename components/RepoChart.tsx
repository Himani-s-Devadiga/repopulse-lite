"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


export default function RepoChart({repo}:any){


const data = [

{
name:"Stars",
value:repo.stargazers_count
},

{
name:"Forks",
value:repo.forks_count
},

{
name:"Issues",
value:repo.openIssues
},

{
name:"Commits",
value:repo.recentCommits
},

{
name:"Contributors",
value:repo.contributorsCount
}

];


return (

<div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">


<h3 className="text-xl font-semibold mb-5">
📊 Repository Statistics
</h3>


<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis 
dataKey="name"
/>

<YAxis />

<Tooltip />


<Bar

dataKey="value"

fill="#2563eb"

radius={[8,8,0,0]}

/>


</BarChart>


</ResponsiveContainer>


</div>

);

}