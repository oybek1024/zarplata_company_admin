import React from 'react'
import { Spin, Space } from 'antd'

export default function Preloader() {
  return (
    <Space size='middle'>
      <Spin size='small' />
      <Spin />
      <Spin size='large' />
    </Space>
  )
}
