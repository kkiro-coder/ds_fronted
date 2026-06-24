import { Result, Button } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，页面不存在"
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard/workplace')}>
          返回工作台
        </Button>
      }
    />
  )
}
