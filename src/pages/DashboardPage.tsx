import { Card, Col, Row, Spin, Statistic } from 'antd'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { STATUS_LABEL } from '../data/params'
import { statusColor } from '../data/statusColors'
import { buildDashboardStats } from '../data/stats'
import { useCitizenIndex } from '../hooks/useCitizenIndex'

export function DashboardPage() {
  const people = useCitizenIndex()

  if (!people) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
        <div style={{ marginTop: 12 }}>Считаем показатели...</div>
      </div>
    )
  }

  const stats = buildDashboardStats()

  const statusPie = stats.statusChart.map((statusItem) => ({
    status: statusItem.name,
    name: STATUS_LABEL[statusItem.name] || statusItem.name,
    value: statusItem.value,
  }))

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Всего граждан" value={stats.total} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Активные" value={stats.active} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="С льготами" value={stats.withBenefits} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Несовершеннолетние" value={stats.minors} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14} className="chart-col">
          <Card title="По регионам" className="chart-card">
            <div className="chart-box chart-box-regions">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.regionChart} margin={{ bottom: 70, left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-35}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Граждан" fill="#0f766e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10} className="chart-col">
          <Card title="По статусу" className="chart-card">
            <div className="chart-box chart-box-status">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusPie} dataKey="value" nameKey="name" outerRadius={90} label>
                    {statusPie.map((item) => (
                      <Cell key={item.status} fill={statusColor(item.status)} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="muted" style={{ textAlign: 'center' }}>
              мужчин ~{stats.maleShare}% / женщин ~{stats.femaleShare}%
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={8}>
          <Card title="Возраст">
            <div className="chart-box chart-box-sm">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.ageChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Человек" fill="#115e59" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Новые постановки на учет">
            <div className="chart-box chart-box-sm">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.registrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Постановок" stroke="#0f766e" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
