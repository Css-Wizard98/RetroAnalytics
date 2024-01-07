import React from 'react'
import {CodeBlock} from '@atlaskit/code';

export default function CodeBox({language,text}) {
	return (
		<CodeBlock language={language} showLineNumbers={true} text={text} />
	)
}
