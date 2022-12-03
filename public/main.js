try{
    const link = document.createElement("link");
    link.rel = "icon";
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        link.href = './bilder/FEdark.svg';
    }
    else{
        link.href = './bilder/FE.svg';
    }
    document.head.appendChild(link);
}
catch(e){
    console.log(e);
}

const ctx = document.getElementById("FantacyFond");
const header = document.getElementById("fondHeader");

(async () => {

    const getData = await fetch('/getFunds');
    const res = await getData.json();
    if(res.status === "OK"){
        // const labels = await res.dataset.map(e => {
        //     const [ day, date, Month ] = e.time.split(" ");
        //     // return `${day.slice(0,3)} ${date} ${Month.slice(0,3)}`;
        //     return `${date} ${Month.slice(0,3)}`;
        // });
        const data = await res.dataset.map((e, i) => e.price);
        const labels = await res.dataset.map((e, i) => e.time);
        const avkast = (data[data.length-1] / 100000 - 1)*100;

        header.innerHTML += ` (${avkast >= 1 ? '+' : '-'}${avkast.toFixed(2)}%)`;

        new Chart("FantacyFond", {
            type: "line",
            label: "Fintech Enigma Fondet",
            data: {
                labels: labels,
                datasets: [{
                    label: "Fintech Enigma Fondet",
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'rgb(75, 192, 192)',
                    data: data
                }]
              },
            options: {
                scaleShowLabels : true,
                legend: {display: true},
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                display: true,
                                autoSkip: true,
                                maxTicksLimit: 10,
                                callback: val => {
                                    const [ day, date, Month ] = val.split(" ");
                                    return `${day.slice(0,3)} ${date} ${Month.slice(0,3)}`;
                                    // return `${date} ${Month.slice(0,3)}`;
                                }
                        }
                    }],
                    y: {
                        beginAtZero: true,
                        ticks: { color: 'white', beginAtZero: false }
                        },
                    yAxes: [
                            {
                                gridLines: { 
                                    color: "#131c2b",
                                }
                            }   
                        ],
                    },
                    elements: {
                        point:{
                            radius: 0
                        }
                    },
                    // hover: {
                    //     intersect: false,
                    //     mode: 'index',
                    // },
                    hover: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        tooltip: {
                          intersect: false
                        }
                      }
                }
        })
    }
})();