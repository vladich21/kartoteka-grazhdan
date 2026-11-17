import { createRoot } from 'react-dom/client'
import { App as AntdApp, ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    locale={ruRU}
    theme={{
      token: {
        colorPrimary: '#0f766e',
        borderRadius: 6,
        fontFamily: 'Roboto, Arial, sans-serif',
      },
    }}
  >
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>,
)
