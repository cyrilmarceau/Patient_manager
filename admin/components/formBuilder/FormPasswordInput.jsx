import { Form, Input } from 'antd'
import _ from 'lodash'
// import FaIcon from '~/components/FaIcon'

function FormPasswordInput({ field }) {
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
            className="pm-form-password-input"
        >
            <Input.Password placeholder={field.label} />
        </Form.Item>
    )
}

FormPasswordInput.defaultProps = {
    field: {},
}

export default FormPasswordInput
