import React from 'react'
import Props from 'prop-types'
import '../Animation/Animation.css'
import Button from '@atlaskit/button/standard-button';
import MoreIcon from '@atlaskit/icon/glyph/more';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from '@atlaskit/dropdown-menu';

/**
 *@author [Aakash Bhadana](https://github.com/aakashbhadana)
 *
 * Default Steak Menu with all classes
 */

function SteakMenu({options,placement="auto"}) {
	return (
        <div>
			<DropdownMenu placement={placement} trigger={({ triggerRef, ...props }) => (
				<Button
					{...props}
					iconBefore={<MoreIcon label="more" />}
					ref={triggerRef}
				/>
			)}>
				{
					options.map(item=>{
						return (
							<DropdownItemGroup key={item.title?item.title:"No Title"} title={item.title}>
								{
									item.actions.map(child=>{
										return (
											<DropdownItem key={child.title} elemBefore={child.before} title={child.title} onClick={child.onClick}>
												{child.title}
											</DropdownItem>
										)
									})
								}
							</DropdownItemGroup>
						)
					})
				}
			</DropdownMenu>
        </div>
	)
}

SteakMenu.defaultProps = {
}

SteakMenu.propTypes = {
	/**
	 * External CSS Class
	 */
	className:Props.string,
}

export default SteakMenu;

