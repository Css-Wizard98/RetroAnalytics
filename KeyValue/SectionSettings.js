import React from 'react'

export default function SectionSettings({children,border="",title,description}) {
	return (
        <div className={`pt3 pb3 flex horizontally ${border}`}>
            <div className="flex-1 hidden mr6">
                <h3 className="fw-500">
                    {title}
                </h3>
                <p className="text-muted">
                    {description}
                </p>
            </div>
            <div className="flex-2">
                {children}
            </div>
        </div>
	)
}
