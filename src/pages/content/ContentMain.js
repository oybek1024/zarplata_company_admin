import React from "react";
import './content.css'
import {Button, Col, Dropdown, Row, Menu, DatePicker} from "antd";
import {DownOutlined} from '@ant-design/icons'
import VerticalBar from "@/pages/chart/Chart";
import Description from "@/pages/chart/Description";
import MultiAxisLine from "@/pages/chart/Linechart";
import DescriptionHead from "@/pages/chart/DescriptionHead";

const ContentMain = function () {
    const menu = (
        <Menu>
            <Menu.Item key="1">
                Маркетинг директор
            </Menu.Item>
            <Menu.Item key="2">
                НДР
            </Menu.Item>
            <Menu.Item key="3">
                Начальник отдела продаж
            </Menu.Item>
            <Menu.Item key="4">
                Начальник отдела логистики
            </Menu.Item>
            <Menu.Item key="4">
                Финансовый директор
            </Menu.Item>
            <Menu.Item key="5">
                Начальник категорийного менеджмента
            </Menu.Item>
            <Menu.Item key="6">
                Коммерческий директор
            </Menu.Item>
            <Menu.Item key="7">
                Заместитель генерального директора
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <Row>
                <Col span={11}>
                    <Dropdown overlay={menu}>
                        <Button
                            block
                        >
                            Маркетинг директор
                            <DownOutlined/>
                        </Button>
                    </Dropdown>
                </Col>
                <Col span={7}>
                    <DatePicker style={{display: 'block'}}/>
                </Col>
                <Col span={6}>
                    <Button block type={"primary"}>
                        Експорт в PDF
                    </Button>
                </Col>
                <Col span={18}>
                    <MultiAxisLine/>
                </Col>
                <Col span={6}>
                    <DescriptionHead/>
                </Col>
                <Col span={18}>
                    <VerticalBar/>
                </Col>
                <Col span={6}>
                    <Description/>
                </Col>


            </Row>
        </>
    )
}

export default ContentMain
