import { Form, InputNumber } from 'antd'
import _ from 'lodash'

function FormNumberInput({ field }) {
    let itemArgs = {}
    return (
        <Form.Item
            {...itemArgs}
            label={field.displayLabel && field.label}
            name={field.key}
            rules={field.rules}
            className="pm-form-number-input"
        >
            <InputNumber
                style={{ width: '256px' }}
                min={field.min}
                max={field.max}
                placeholder={field.label}
                type={field.type}
            />
        </Form.Item>
    )
}

FormNumberInput.defaultProps = {
    field: {},
}

export default FormNumberInput
