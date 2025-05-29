// body 내부에 필요한 부분
// <div>
//     <select id="rangeSelector">
//         <option value="">선택</option>
//         <option value="3y">3년</option>
//         <option value="4y">4년</option>
//         <option value="5y">5년</option>
//     </select>
//     <canvas id="myBarChart"></canvas>
// </div>

// 차트 api 불러오기 + 그래프 위에 숫자 보여줄려고 플러그인 불러오기
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>

// 여기부터가 차트 설정 및 데이터
let myChart;
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myBarChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '이용자 수',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                },
                {
                    label: '돌보미 수',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        },
        options: {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    font: {
                        weight: 'bold'
                    },
                    color: '#333'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        plugins: [ChartDataLabels]
    });
});
document.getElementById('rangeSelector').addEventListener('change', function (e) {
    const value = e.target.value;

    if (value === '3y') {
        myChart.data.labels = ['2022년', '2023년', '2024년'];
        myChart.data.datasets[0].data = [78212, 86100, 118126];  // 이용자 수
        myChart.data.datasets[1].data = [26675, 28071, 28663];  // 돌보미 수
    } else if (value === '4y') {
        myChart.data.labels = ['2021년', '2022년', '2023년', '2024년'];
        myChart.data.datasets[0].data = [71789, 78212, 86100, 118126];  // 이용자 수
        myChart.data.datasets[1].data = [25917, 26675, 28071, 28663];  // 돌보미 수
    } else if (value === '5y') {
        myChart.data.labels = ['2020년', '2021년', '2022년', '2023년', '2024년'];
        myChart.data.datasets[0].data = [59663, 71789, 78212, 86100, 118126];  // 이용자 수
        myChart.data.datasets[1].data = [24469, 25917, 26675, 28071, 28663];  // 돌보미 수
    }

    myChart.update();
});
