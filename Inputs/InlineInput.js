import React from 'react'
import InlineEdit from "@atlaskit/inline-edit";
import TextField from '@atlaskit/textfield'

export default function InlineInput({className="",maxWidth="75%",value,testId="input-heading",label,validate,onConfirm}) {
	return (
		<div className={`inline-input ${className}`} style={{
			maxWidth,
		}}>
			<InlineEdit
				testId={testId}
				defaultValue={value}
				label={label}
				editView={({ errorMessage, ...fieldProps }) => (
					<TextField  {...fieldProps} autoFocus />
				)}
				readView={() => (
					<div className="w-100 border-dark" style={{padding:10,borderRadius:2,minWidth:350,cursor:'pointer',background:'var(--theme-variant-color)'}}>
						{value || 'Click to enter a value'}
					</div>
				)}
				onConfirm={onConfirm}
				placeholder={label}
				validate={validate}
			/>
		</div>
	)
}
