import React from 'react';
import {Card, List} from "antd";
import './description.css'
import addChart from '@/assets/images/addchart.svg'
import company from '@/assets/images/company.svg'

const data = [
    {title: 'Количество компаний', number: 15, img: addChart},
    {title: 'Количество компаний', number: 10, img: company},
    {title: 'Количество компаний', number: 15, img: addChart},
    {title: 'Количество компаний', number: 29, img: company},
    {title: 'Количество компаний', number: 92, img: addChart},
    {title: 'Количество компаний', number: 23, img: company},
];

const DescriptionHead = () => (
    <div className="description">
        <Card title="Детали отчети">
            <List
                dataSource={data}
                renderItem={item => <List.Item>
                    <img src={item.img} alt=""/>
                    <h4>{item.title}</h4>
                    <h4 style={{paddingRight: '13px'}}>{item.number}</h4>
                </List.Item>}
            />
        </Card>

    </div>
)

export default DescriptionHead