import { useState } from 'react'
import { Form, Input, Button } from '@arco-design/web-react'
import type { ToastType } from '../types'

const FormItem = Form.Item

interface LoginFormProps {
  onShowToast: (message: string, type: ToastType) => void
  onLoginSuccess: (username: string) => void
}

export default function LoginForm({ onShowToast, onLoginSuccess }: LoginFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 1500))
    setLoading(false)

    if (values.username === 'admin' && values.password === 'admin123') {
      onShowToast('登录成功，正在跳转...', 'success')
      setTimeout(() => onLoginSuccess(values.username as string), 800)
    } else {
      onShowToast('用户名或密码错误', 'error')
    }
  }

  return (
    <div className="form-wrapper">
      <h1 className="form-title">登录</h1>
      <Form
        form={form}
        onSubmit={handleSubmit}
        layout="vertical"
        size="large"
        style={{ width: '100%' }}
      >
        <FormItem
          field="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" autoComplete="username" />
        </FormItem>

        <FormItem
          field="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { minLength: 6, message: '密码至少需要6位字符' },
          ]}
        >
          <Input.Password placeholder="请输入密码" autoComplete="current-password" />
        </FormItem>

        <FormItem style={{ marginTop: 8 }}>
          <Button type="primary" htmlType="submit" long loading={loading}>
            {loading ? '登录中...' : '登 录'}
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}
