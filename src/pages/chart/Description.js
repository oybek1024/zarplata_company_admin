import React from 'react';
import {Card, List} from "antd";
import './description.css'
import '../../index.css'

const data = [
    {title: 'Класс A', status: true},
    {title: 'Класс Б', status: false},
    {title: 'Класс С', status: true},
    {title: 'Класс Д', status: false},
    {title: 'Класс Е', status: true},
    {title: 'Класс Ф', status: true},
    {title: 'Класс Г', status: false},
    {title: 'Класс И', status: false},
];

const Description = () => (
    <div className="description">
        <Card title="Моя компания">
            <List
                dataSource={data}
                renderItem={item => <List.Item>
                    <div className='title'>
                        <h4>{item.title}</h4>
                        {item.status?<p className='true-title'>Есть</p>:<p className='false-title'>Нет</p>}
                    </div>
                </List.Item>}
            />
        </Card>

    </div>
)

export default Description