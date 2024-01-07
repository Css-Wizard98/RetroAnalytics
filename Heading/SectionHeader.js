import React from 'react'

export default function SectionHeader({title,subtitle,children}) {
	return (
		<div className="pb4 border-bottom">
            <h2 className="fw-600">
                {title}
            </h2>
            <p className="text-small text-muted">
                {subtitle}
            </p>
		</div>
	)
}
