import { Form, Input } from 'antd'
import _ from 'lodash'

function FormTextInput({ field }) {
    let itemArgs = {}

    if (!_.isEmpty(field.helperText)) {
        itemArgs.extra = field.helperText
    }
    if (!_.isEmpty(field.dependencies)) {
        itemArgs.dependencies = field.dependencies
    }

    return (
        <Form.Item
            {...itemArgs}
            label={field.displayLabel && field.label}
            name={field.key}
            rules={field.rules}
            className="pm-form-text-input"
        >
            <Input placeholder={field.displayLabel && field.label} />
        </Form.Item>
    )
}

FormTextInput.defaultProps = {
    field: {},
}

export default FormTextInput
