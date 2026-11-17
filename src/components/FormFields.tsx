import { createContext, useContext } from 'react'
import { Col, Form, Input, InputNumber, Row, Select, Space } from 'antd'
import { formatRuDate } from '../data/generate'

const EditingContext = createContext(false)

export function EditingProvider(props: { editing: boolean; children: React.ReactNode }) {
  return <EditingContext.Provider value={props.editing}>{props.children}</EditingContext.Provider>
}

export function useEditing() {
  return useContext(EditingContext)
}

export function Fields({ children }: { children: React.ReactNode }) {
  return (
    <Form layout="vertical">
      <Row gutter={16}>{children}</Row>
    </Form>
  )
}

function FieldBox(props: { label: string; span: number; required?: boolean; children: React.ReactNode }) {
  return (
    <Col xs={24} md={props.span}>
      <Form.Item required={props.required} label={<span className="field-label">{props.label}</span>}>
        {props.children}
      </Form.Item>
    </Col>
  )
}

function FieldValue(props: { text: string }) {
  const text = props.text.trim()
  if (!text) return <div className="field-value muted">—</div>
  return <div className="field-value">{text}</div>
}

function groupDigits(raw: string) {
  const digits = raw.replace(/[^\d]/g, '')
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function TextField(props: {
  label: string
  value: string
  onChange: (value: string) => void
  span?: number
  required?: boolean
}) {
  const span = props.span ?? 8
  const editing = useEditing()

  return (
    <FieldBox label={props.label} span={span} required={props.required}>
      {editing ? (
        <Input
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      ) : (
        <FieldValue text={props.value} />
      )}
    </FieldBox>
  )
}

export function DateField(props: {
  label: string
  value: string
  onChange: (value: string) => void
  span?: number
  required?: boolean
}) {
  const span = props.span ?? 8
  const editing = useEditing()

  return (
    <FieldBox label={props.label} span={span} required={props.required}>
      {editing ? (
        <Input
          type="date"
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      ) : (
        <FieldValue text={props.value ? formatRuDate(props.value) : ''} />
      )}
    </FieldBox>
  )
}

export function NumberField(props: {
  label: string
  value: number
  onChange: (value: number) => void
  span?: number
  money?: boolean
}) {
  const span = props.span ?? 8
  const editing = useEditing()
  const shown = props.money ? groupDigits(String(props.value)) + ' ₽' : String(props.value)

  return (
    <FieldBox label={props.label} span={span}>
      {editing ? (
        props.money ? (
          <Space.Compact style={{ width: '100%' }}>
            <InputNumber
              style={{ width: '100%' }}
              value={props.value}
              min={0}
              formatter={(value) => groupDigits(String(value ?? ''))}
              parser={(value) => Number(String(value ?? '').replace(/[^\d]/g, '') || 0)}
              onChange={(next) => props.onChange(next || 0)}
            />
            <Space.Addon>₽</Space.Addon>
          </Space.Compact>
        ) : (
          <InputNumber
            style={{ width: '100%' }}
            value={props.value}
            min={0}
            onChange={(next) => props.onChange(next || 0)}
          />
        )
      ) : (
        <FieldValue text={shown} />
      )}
    </FieldBox>
  )
}

export function SelectField<Value extends string>(props: {
  label: string
  value: Value
  onChange: (value: Value) => void
  options: { value: Value; label: string }[]
  span?: number
  required?: boolean
}) {
  const span = props.span ?? 8
  const editing = useEditing()
  const current = props.options.find((option) => option.value === props.value)

  return (
    <FieldBox label={props.label} span={span} required={props.required}>
      {editing ? (
        <Select
          value={props.value}
          onChange={props.onChange}
          options={props.options}
        />
      ) : (
        <FieldValue text={current ? current.label : props.value} />
      )}
    </FieldBox>
  )
}

export function TextAreaField(props: {
  label: string
  value: string
  onChange: (value: string) => void
  span?: number
}) {
  const span = props.span ?? 24
  const editing = useEditing()

  return (
    <FieldBox label={props.label} span={span}>
      {editing ? (
        <Input.TextArea
          rows={2}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      ) : (
        <FieldValue text={props.value} />
      )}
    </FieldBox>
  )
}

export function labelOptions<Value extends string>(map: Record<Value, string>) {
  const keys = Object.keys(map) as Value[]

  return keys.map((key) => ({
    value: key,
    label: map[key],
  }))
}
