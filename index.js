const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
window.addEventListener("load", (event) => {
    const loader=document.getElementById('loaderDots');
    loader.style.display="block";
    fetch('https://codeforces.com/api/contest.list',{
        method:'GET',
    }).then((data)=>{
        return data.json();
    }).then((data)=>{
        // console.log(data);
        const contestList=data.result;
        const upcomingContest=[];
        for(var i=0;i<100;i++){
            if(contestList[i].phase==="BEFORE"){
                upcomingContest.push(contestList[i]);
            }
        }
        upcomingContest.reverse();
        console.log(upcomingContest);
        const tableBody=document.querySelector('.table-body');
        let count=1;
        loader.style.display="none"
        for(const contest of upcomingContest){
            const name=contest.name; // name of the contest
            const type=contest.type; // type of the contest
            const duration=contest.durationSeconds;
            let time=""; // duration of the contest
            if(duration%3600==0){
                time+=`${duration/3600}hr`
            }
            else{
                time+=`${Math.floor(duration/3600)}hr ${(duration%3600)/60}min`
            }
            let startTime=contest.startTimeSeconds;
            const contestDate=new Date(startTime*1000);
            startTime+=19800;
            let hour=Math.floor((startTime%(24*60*60))/3600);// hours left
            let min=Math.floor(((startTime%(24*60*60))%3600)/60)
            const currentDate=new Date();
            const differSeconds=(contestDate-currentDate)/1000;
            const daysLeft=Math.floor(differSeconds/(24*60*60));// day left
            const hoursLeft=Math.floor((differSeconds%(24*60*60))/3600);// hours left
            const minLeft=Math.floor(((differSeconds%(24*60*60))%3600)/60) // mins left
            const date=contestDate.getDate();// date of contest
            const month=monthNames[contestDate.getMonth()]; // month of contest
            const year=contestDate.getFullYear(); // year of contest
            if(hour>=0 && hour<=9){
                hour=`0${hour}`
            }
            if(min>=0 && min<=9){
                min=`0${min}`
            }
            const tableRow=document.createElement('tr');
            tableRow.innerHTML=`
            <td>${count}</td>
            <td>${type}</td>
            <td>${name}</td>
            <td>${month}/${date}/${year}<br>${hour}:${min}</td>
            <td>${daysLeft} days, ${hoursLeft} hours, ${minLeft} minutes</td>
            <td>${time}</td>
            `;
            tableBody.appendChild(tableRow);
            count++;
            console.log(hour,min);
        }
    })
    .catch((er)=>{
        console.log(er);
    })
});
