import FormTextInput from './FormTextInput'
import FormNumberInput from './FormNumberInput'
import FormPasswordInput from './FormPasswordInput'
// import FormEmailInput from './FormEmailInput'
// import FormDisplayDataInput from './FormDisplayDataInput'
// import FormSelectInput from './FormSelectInput'
// import FormTitleInput from './FormTitleInput'
// import FormRangePicker from './FormRangePicker'

// import FormRangeNumber from './FormRangeNumber'
// import FormRadio from './FormRadio'
import _ from 'lodash'

function FormBuilder({ fieldsList, formInst = null, className = '' }) {
    return (
        <div className={'pm-form-builder ' + className}>
            {_.isArray(fieldsList) &&
                fieldsList.map((fl) => {
                    let render = ''

                    switch (fl.type) {
                        case 'text':
                            render = (
                                <FormTextInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'number':
                            render = (
                                <FormNumberInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'password':
                            render = (
                                <FormPasswordInput
                                    field={fl}
                                    formInst={formInst}
                                    key={'fl-' + fl.key}
                                />
                            )
                            break
                        case 'displayData':
                            // render = (
                            //     <FormDisplayDataInput
                            //         field={fl}
                            //         formInst={formInst}
                            //         key={'fl-' + fl.key}
                            //     />
                            // )
                            break
                        case 'select':
                            // render = (
                            //     <FormSelectInput
                            //         field={fl}
                            //         formInst={formInst}
                            //         key={'fl-' + fl.key}
                            //     />
                            // )
                            break
                        case 'rangePicker':
                            // render = (
                            //     <FormRangePicker
                            //         field={fl}
                            //         formInst={formInst}
                            //         key={'fl-' + fl.key}
                            //     />
                            // )
                            break
                        case 'title':
                            // render = (
                            //     <FormTitleInput
                            //         field={fl}
                            //         formInst={formInst}
                            //         key={'fl-' + fl.key}
                            //     />
                            // )
                            break
                        case 'email':
                            // render = (
                            //     <FormEmailInput
                            //         field={fl}
                            //         formInst={formInst}
                            //         key={'fl-' + fl.key}
                            //     />
                            // )
                            break
                        case 'rangeNumber':
                            // render = (
                            //     <FormRangeNumber
                            //         field={fl}
                            //         formInst={formInst}
                            //         key={'fl-' + fl.key}
                            //     />
                            // )
                            break
                        case 'formRadio':
                            // render = (
                            //     <FormRadio field={fl} formInst={formInst} key={'fl-' + fl.key} />
                            // )
                            break

                        default:
                            render = (
                                <p key={fl.label}>
                                    {fl.label} - "{fl.type}" field
                                </p>
                            )
                    }

                    return render
                })}
        </div>
    )
}

FormBuilder.defaultProps = {
    fieldsList: [],
}

export default FormBuilder
