import { Tag } from 'antd'
import { APPEAL_STATUS_LABEL, STATUS_LABEL } from '../data/params'
import { statusColor } from '../data/statusColors'

export function StatusBadge({ status }: { status: string }) {
  const text = STATUS_LABEL[status] || APPEAL_STATUS_LABEL[status] || status
  return <Tag variant="solid" color={statusColor(status)}>{text}</Tag>
}
