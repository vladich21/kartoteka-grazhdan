import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Layout, Menu } from 'antd'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export function AppLayout() {
  const nav = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [siderOpen, setSiderOpen] = useState(true)

  let title = 'Дашборд'
  let menuKey = '/'

  if (path.indexOf('/citizens/') === 0) {
    title = 'Карточка гражданина'
    menuKey = '/registry'
  } else if (path.indexOf('/registry') === 0) {
    title = 'Картотека граждан'
    menuKey = '/registry'
  } else if (path.indexOf('/params') === 0) {
    title = 'Параметры учета'
    menuKey = '/params'
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={220}
        collapsedWidth={80}
        collapsed={!siderOpen}
        trigger={null}
        theme="dark"
        className="app-sider"
      >
        <div className="logo-block">
          <div className="logo-mark">ИЗБ</div>
          {siderOpen ? (
            <div>
              <strong>Картотека</strong>
              <span>учет граждан</span>
            </div>
          ) : null}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[menuKey]}
          onClick={(item) => nav(item.key)}
          items={[
            { key: '/', icon: <DashboardOutlined />, label: 'Дашборд' },
            { key: '/registry', icon: <TeamOutlined />, label: 'Картотека' },
            { key: '/params', icon: <UnorderedListOutlined />, label: 'Параметры учета' },
          ]}
        />
      </Sider>

      <Layout className="app-main">
        <Header
          style={{
            background: '#fff',
            padding: '0 24px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Button
              type="text"
              className="sider-toggle"
              aria-label={siderOpen ? 'Свернуть меню' : 'Развернуть меню'}
              icon={siderOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setSiderOpen(!siderOpen)}
            />
            <h1 style={{ margin: 0, fontSize: 18 }}>{title}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="muted">ФИО оператора</span>
            <Avatar icon={<UserOutlined />} style={{ background: '#334155' }} />
          </div>
        </Header>

        <Content className="page-wrap">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
