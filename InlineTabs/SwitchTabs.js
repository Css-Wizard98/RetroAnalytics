import React from 'react'

export default function SwitchTabs({title,tabs, active, onClick}) {
    return (
        <>
            <p className="text-secondary-color mt4 mb2 fw-400">
                {title}
            </p>
            <div className="flex">
                {
                    tabs.map((item, index) => {
                        let mActive = item === active;
                        return (
                            <p className={`chip ${mActive&&'chip-active'}`} onClick={onClick.bind(this,item)} key={item} style={{}}>
                                {item}
                            </p>
                        )
                    })
                }
            </div>
        </>
    )
}
