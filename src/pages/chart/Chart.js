import React from 'react';
import {Bar} from 'react-chartjs-2'
import {Card} from "antd";
import './chart.css'


const data = {
    labels: [
        'Класс A',
        'Класс Б',
        'Класс С',
        'Класс Д (Коментария)',
        'Класс Е',
        'Класс Ф (Коментария)',
        'Класс  Г',
        'Класс  И',
    ],
    datasets: [
        {
            label: '# of Votes',
            data: [13, 9, 13, 9, 3, 9, 11, 3],
            backgroundColor: [
                '#00B13E',
                '#F21404',
                '#00B13E',
                '#F21404',
                '#00B13E',
                '#00B13E',
                '#F21404',
                '#F21404',
            ],
        },
    ],
}

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
                line: 'dash',
            },
        ],
        xAxes: [{
            maxBarThickness: 24,
        }],
    },
}


const VerticalBar = () => (
    <div className="chart">
        <Card title="Машины">
            <Bar data={data} options={options}/>
        </Card>

    </div>
)

export default VerticalBar