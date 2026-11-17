import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

export function BackLink(props: {
  to: string
  children: string
}) {
  return (
    <Link to={props.to} className="back-link">
      <ArrowLeftOutlined /> {props.children}
    </Link>
  )
}
