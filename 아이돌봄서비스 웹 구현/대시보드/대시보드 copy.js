let myChart;
// 3~5년 이용자, 돌보미 바차트
const bar_chart = () => {
    const ctx = document.getElementById('BarChart');
    // ctx가 null이면 차트를 만들지 않고 함수 종료
    if (!ctx) return;

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
                    // 숫자 관련 설정
                    anchor: 'end',
                    align: 'top',
                    font: {
                        weight: 'bold'
                    },
                    color: '#333'
                }
            },
        },
        // 그래프에 정확한 숫자 보여줄려고 플러그인 추가
        plugins: [ChartDataLabels]
    });

    // 안에 데이터를 직접 쓰니까 이렇게 따로 써주는 게 편함함
    const selector = document.getElementById('rangeSelector');
    if (selector) {
        selector.addEventListener('change', function (e) {
            const value = e.target.value;

            if (value === '3y') {
                // 최근 3년동안 기록 보여주기
                myChart.data.labels = ['2022년', '2023년', '2024년'];
                myChart.data.datasets[0].data = [78212, 86100, 118126];
                myChart.data.datasets[1].data = [26675, 28071, 28663];
            } else if (value === '4y') {
                // 최근 4년동안 기록 보여주기
                myChart.data.labels = ['2021년', '2022년', '2023년', '2024년'];
                myChart.data.datasets[0].data = [71789, 78212, 86100, 118126];
                myChart.data.datasets[1].data = [25917, 26675, 28071, 28663];
            } else if (value === '5y') {
                // 최근 5년동안 기록 보여주기
                myChart.data.labels = ['2020년', '2021년', '2022년', '2023년', '2024년'];
                myChart.data.datasets[0].data = [59663, 71789, 78212, 86100, 118126];
                myChart.data.datasets[1].data = [24469, 25917, 26675, 28071, 28663];
            } else {
                // 선택칸을 고르면 그래프 지우기
                myChart.data.labels = [];
                myChart.data.datasets[0].data = [];
                myChart.data.datasets[1].data = [];
            }

            myChart.update();
        });
    }
}

// 시간대별 이용자 수, 폴라차트
const polar_chart = () => {
    const ctx = document.getElementById('PolarChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['6시~8시', '8시~10시', '10시~12시', '12시~14시', '14시~16시', '16시~18시', '18시~20시', '20시~22시'],
            datasets: [{
                labels: [],
                data: [17.3, 15.5, 8.1, 8.1, 8.5, 30.2, 9.7, 2.6],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        },
        options: {

        },
    })
};

// 돌보미 별 별점평균 + 태그
const doughnut_chart = () => {
    const ctx = document.getElementById("DoughnutChart");
    if (!ctx) return;

    const averageScore = 4.5; // 여기에 원하는 평균점수를 입력
    const maxScore = 5;

    const data = {
        labels: ['평균 별점', ''],
        datasets: [{
            data: [averageScore, maxScore - averageScore],
            backgroundColor: ['rgba(33, 145, 236, 0.9)', 'rgba(230, 230, 230, 0.3)'],
            borderWidth: 0
        }]
    };

    // 중앙 텍스트 플러그인 (v4 이상)
    const centerTextPlugin = {
        id: 'centerTextPlugin',
        afterDraw: (chart) => {
            const { ctx, chartArea } = chart;
            if (!chartArea) return; // 초기 렌더링에서 chartArea가 없을 수 있음
            ctx.save();
            ctx.font = 'bold 60px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // 별점 보여주기 (4.5/5)
            const text = `${averageScore} / ${maxScore}`;
            // 도넛의 중앙 좌표 계산
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 1.5; // 1.3으로 하면 위쪽 반원 중앙에 맞음
            ctx.fillText(text, centerX, centerY);
            ctx.restore();
        }
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            circumference: 180,
            rotation: -90,
            cutout: '50%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        },
        plugins: [centerTextPlugin]
    };

    new Chart(ctx, config);
};


document.addEventListener('DOMContentLoaded', () => {
    bar_chart();
    polar_chart();
    doughnut_chart();

});
