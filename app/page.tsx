"use client";

import { useState } from "react";
import RepoChart from "@/components/RepoChart";
import HealthBreakdown from "@/components/HealthBreakdown";
import GradeBadge from "@/components/GradeBadge";


export default function Home() {


  const [url,setUrl] = useState("");
  const [repo,setRepo] = useState<any>(null);
  const [score,setScore] = useState(0);
  const [report,setReport] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");



  async function analyzeRepo(){


    try{


      setLoading(true);
      setError("");



      const parts = url.split("/");


      if(parts.length < 5){

        setError("Please enter a valid GitHub repository URL");

        return;

      }



      const owner = parts[3];
      const repoName = parts[4];



      const response = await fetch("/api/analyze",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          owner,
          repo:repoName

        })

      });



      const data = await response.json();



      if(!data.success){

        throw new Error(data.error);

      }



      setRepo(data.repository);

      setScore(data.healthScore || 0);

      setReport(data.report || "");



    }

    catch(err:any){

      setError(err.message || "Something went wrong");

    }

    finally{

      setLoading(false);

    }


  }





  return (


<main className="min-h-screen bg-slate-950 text-white p-10">


<div className="max-w-5xl mx-auto">



{/* Header */}

<div className="border border-slate-800 bg-slate-900 rounded-xl p-8">


<h1 className="text-4xl font-bold">

🚀 RepoPulse Lite

</h1>


<p className="text-slate-400 mt-2">

AI-powered GitHub Repository Intelligence Platform

</p>


</div>






{/* Search */}

<div className="mt-8 flex gap-4">


<input


className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4"


placeholder="Enter GitHub repository URL"


value={url}


onChange={(e)=>setUrl(e.target.value)}


/>



<button


onClick={analyzeRepo}


className="bg-blue-600 px-8 rounded-lg hover:bg-blue-700"


>


{

loading ? "Analyzing..." : "Analyze"

}


</button>


</div>






{

error && (

<div className="mt-5 bg-red-900 border border-red-700 p-4 rounded-lg">

❌ {error}

</div>

)

}








{

repo && (


<div className="mt-10">



<h2 className="text-2xl font-semibold">

{repo.full_name}

</h2>






{/* Repository Metrics */}


<div className="grid md:grid-cols-4 gap-5 mt-6">


{

[

["⭐ Stars",repo.stargazers_count],

["🍴 Forks",repo.forks_count],

["👥 Contributors",repo.contributorsCount],

["📈 Commits",repo.recentCommits],

["🐛 Issues",repo.openIssues],

["💻 Language",repo.language || "N/A"],

["📜 License",repo.license || "N/A"],

["🕒 Updated",

new Date(repo.updatedAt).toLocaleDateString()

]


].map((item:any,index)=>(


<div

key={index}

className="bg-slate-900 border border-slate-800 rounded-xl p-5"


>


<p className="text-slate-400 text-sm">

{item[0]}

</p>


<h3 className="text-xl font-bold mt-2">

{item[1]}

</h3>


</div>


))


}


</div>








{/* Chart */}


<RepoChart repo={repo}/>








{/* Health Score */}


<div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-6">


<h3 className="text-xl font-semibold">

❤️ Repository Health Score

</h3>




<div className="flex justify-between mt-4">


<span>

Overall Quality

</span>


<span className="font-bold">

{score}/100

</span>


</div>




<div className="bg-slate-700 h-3 rounded-full mt-3">


<div


className="bg-blue-500 h-3 rounded-full"


style={{

width:`${score}%`

}}


/>


</div>



</div>







{/* Health Breakdown */}


<HealthBreakdown repo={repo}/>








{/* Grade Badge */}


<GradeBadge score={score}/>








{/* Description */}


<div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">


<h3 className="font-semibold text-xl">

📝 Description

</h3>


<p className="text-slate-300 mt-3">

{repo.description || "No description available"}

</p>


</div>








{/* AI Report */}



{

report && (


<div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-8">


<h3 className="text-2xl font-semibold">

🤖 AI Engineering Report

</h3>



<div className="mt-5 whitespace-pre-line text-slate-300 leading-relaxed">


{report}


</div>



</div>


)

}







</div>


)


}



</div>


</main>


  );


}