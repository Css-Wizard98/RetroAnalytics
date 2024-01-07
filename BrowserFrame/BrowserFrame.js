import React from 'react'
import LeftArrow from "@atlaskit/icon/glyph/arrow-left";
import RightArrow from '@atlaskit/icon/glyph/arrow-right'
import Refresh from '@atlaskit/icon/glyph/world'
import LinkIcon from '@atlaskit/icon/glyph/link'
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical'

export default function BrowserFrame({children,url}) {
	return (
        <div className="border rounded-md">
            <div className="flex horizontally center-vertically" style={{
                height:33,
                borderBottom:'1px solid #dedede',
                background:'var(--theme-variant-color)'
            }}>
                <div className="ml1" style={{
                    width:12,
                    height:12,
                    borderRadius:6,
                    background:'#ff605C'
                }}/>
                <div className="ml1"  style={{
                    width:12,
                    height:12,
                    borderRadius:6,
                    background:'#FFBD44'
                }}/>
                <div className="ml1"  style={{
                    width:12,
                    height:12,
                    borderRadius:6,
                    background:'#00CA4E'
                }}/>
            </div>
            <div className="flex horizontally center-vertically" style={{
                height:25,
                borderBottom:'1px solid #dedede',
                padding:'0 5px',
            }}>
                <div style={{paddingTop:2}}>
                    <LeftArrow size="small"/>
                </div>
                <div style={{opacity:.46,paddingTop:2}} className="ml1">
                    <RightArrow size="small"/>
                </div>
                <div style={{paddingTop:2}} className="ml1">
                    <Refresh size="small"/>
                </div>
                <div className="ml2 mr2" style={{
                    flex:1,
                    height:16,
                    fontSize:9,
                    background:'var(--theme-variant-color)',
                    borderRadius:10,
                    padding:'2px 20px',
                    textAlign:'center'
                }}>
                    {url}
                </div>
                <div  className="flex horizontally center-vertically"  style={{width:60,flexDirection:'row-reverse'}}>
                    <MoreVerticalIcon size="small"/>
                    <div style={{width:8}}/>
                    <LinkIcon size="small"/>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
	)
}
