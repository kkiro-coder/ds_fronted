import { Result, Button } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'

export default function ForbiddenPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有访问此页面的权限"
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard/workplace')}>
          返回工作台
        </Button>
      }
    />
  )
}
