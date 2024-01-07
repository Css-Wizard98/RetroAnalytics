import React from 'react'
import SectionMessage, {SectionMessageAction} from '@atlaskit/section-message';

/**
 *
 * @param margin
 * @param children
 * @param title
 * @param appearance danger | success | discovery | warning | info
 * @param actions [{title:"",click:()=>{}}]
 * @returns {JSX.Element}
 * @constructor
 */
export default function SectionMessages({margin = "mt3 mb3",children,title,appearance="success",actions = []}) {
	const ACTIONS = [];
	actions.forEach(item=>{
		ACTIONS.push(
			<SectionMessageAction href="" onClick={item.click} >{item.title}</SectionMessageAction>
		)
	})
	return (
		<div className={`${margin} bg-info relative`}>
			<SectionMessage
				appearance={appearance}
				title={title}
				actions={ACTIONS}
			>
				{children}
			</SectionMessage>
		</div>
	)
}
