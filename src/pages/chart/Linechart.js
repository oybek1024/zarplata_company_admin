import React from 'react'
import {Line} from 'react-chartjs-2'
import {Card} from "antd";
import './chart.css'


const data = {
    labels: [
        `2010`,
        '2011',
        '2012',
        '2013',
        '2014 (Коментария)',
        '2015',
        '2016 (Коментария)',
        '2017',
        '2018',
        '2019',
        '2020',
    ],
    datasets: [
        {
            label: 'Высоко',
            data: [60, 70, 60, 65, 75, 65, 68, 70, 75, 70, 65, 60],
            fill: 1,
            borderColor: '#0028FB',
            tension: 0,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderWidth: 0,
        },
        {
            label: 'Средний',
            data: [40, 40, 30, 50, 35, 30, 50, 45, 33, 42, 48, 10],
            fill: false,
            borderColor: '#1AB2EF',
            tension: 0,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderWidth: 0,
        },
        {
            label: 'Моя компания',
            data: [30, 19, 15, 25, 50, 23, 45, 19, 15, 25, 15, 23],
            fill: false,
            borderColor: '#F21404',
            tension: 0,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderWidth: 0,
        },
        {
            label: 'Низкий',
            data: [9, 10, 7, 10, 5, 6, 9, 10, 7, 10, 5, 6],
            fill: 1,
            borderColor: '#148EFF',
            tension: 0,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderWidth: 0,
        },
    ],
}

const options = {

    tooltips: {
        intersect: false,
        mode: 'index',
    },

    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: false,
                },
                gridLines: {
                    borderDash: [10, 8],
                },
            },
        ],
        xAxes: [
            {
                gridLines: {
                    display: false
                },
                ticks: {
                    maxRotation: 0,
                },
            },
        ]
    },
}


const MultiAxisLine = () => (
    <div className="chart">
        <Card title="Зарплата">
            <Line data={data} options={options}/>
        </Card>
    </div>
)

export default MultiAxisLine