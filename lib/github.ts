import axios from "axios";

const github = axios.create({

  baseURL: "https://api.github.com",

  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },

});



export async function getRepository(owner:string, repo:string){


  try {


    const repoData = await github.get(
      `/repos/${owner}/${repo}`
    );


    const contributors = await github.get(
      `/repos/${owner}/${repo}/contributors`
    );


    const commits = await github.get(
      `/repos/${owner}/${repo}/commits`
    );



    return {

      ...repoData.data,


      contributorsCount:
        contributors.data.length,


      recentCommits:
        commits.data.length,


      openIssues:
        repoData.data.open_issues_count,


      license:
        repoData.data.license?.name || "No License",


      updatedAt:
        repoData.data.updated_at,


    };


  } catch(error:any){


    console.error(
      "GitHub API Error:",
      error.response?.data || error.message
    );


    throw new Error(
      "Unable to fetch GitHub repository data"
    );


  }


}