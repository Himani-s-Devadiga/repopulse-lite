export function calculateScore(repo:any){


let score = 0;


// Popularity
if(repo.stargazers_count > 10000){

score += 30;

}
else if(repo.stargazers_count > 1000){

score += 20;

}
else{

score += 10;

}




// Community

if(repo.contributorsCount > 50){

score += 25;

}
else if(repo.contributorsCount > 10){

score += 15;

}
else{

score += 5;

}




// Activity

if(repo.recentCommits > 20){

score += 25;

}
else{

score += 10;

}




// Maintenance

if(repo.openIssues < 1000){

score += 20;

}
else{

score += 10;

}


return score;

}