import {useEffect, useState} from "react";
import './theme.css'
import './variables.css'
import './fonts.css'
import '../FontAwesome/all.min.css'
import {getTheme} from "../Utils/colors";
import {useSelector} from "react-redux";


function calculate(color) {
	if (color === "#212121" || color === "#000000") {
		return {
			color,
			bg: "#ffffff",
			primary: "#000000",
			onPrimary: "#ffffff",
			primaryContainer: "#EAEAEA",
			onPrimaryContainer: "#000000",
			secondary: "#666",
			onSecondary: "#000",
			secondaryContainer: "#D8CCF1",
			onSecondaryContainer: "#000000",
			link: "#29BC9B",
			onLink: "#000000",
			linkContainer: "#79FFE1",
			onLinkContainer: "#000000",
			surface: "#fff",
			onSurface: "#000000",
			surfaceVariant: "#EAEAEA",
			onSurfaceVariant: "#000000",
			light: "#666",
			text: "#000000",
			outline: "#999",
			hoverColor: "#79FFE1",
			success: "#0070F3",
			error: "#E00",
			onError: "#fff",
			errorContainer: "#F7D4D6",
			onErrorContainer: "#000000"
		}
	}
	return getTheme(color)
}


function useTheme() {
	const {color} = useSelector(state => ({
		color: state.auth.config.color
	}))
	const [THEME, SetTheme] = useState(calculate(color))
	useEffect(() => {
		if (THEME.color !== color) {
			SetTheme(calculate(color))
		}
	},[THEME,color,SetTheme])

	useEffect(()=>{
		if(THEME){
			let element = document.getElementsByTagName("body")[0]
			element.style.setProperty("--theme-primary-color",THEME.primary)
			element.style.setProperty("--ds-background-selected",THEME.primary)
			element.style.setProperty("--ds-surface","#ffffff")
			element.style.setProperty("--ds-background",THEME.hoverColor)
			element.style.setProperty("--ds-text-selected",THEME.onPrimary)
			element.style.setProperty("--ds-text",THEME.onSurface)
			element.style.setProperty("--theme-bg-container","#ffffff")
			element.style.setProperty("--theme-surface-color","#ffffff")
			element.style.setProperty("--theme-variant-color",THEME.surfaceVariant)
			element.style.setProperty("--theme-on-variant-color",THEME.onSurfaceVariant)
			element.style.setProperty("--theme-outline-color",THEME.outline)
			element.style.setProperty("--theme-on-primary-color",THEME.onPrimary)
			element.style.setProperty("--ds-background-success-bold",THEME.primary)
			element.style.setProperty("--theme-primary-container",THEME.primaryContainer)
			element.style.setProperty("--theme-on-primary-container",THEME.onPrimaryContainer)
			element.style.setProperty("--theme-secondary-color",THEME.secondary)
			element.style.setProperty("--theme-on-secondary-color",THEME.onSecondary)
			element.style.setProperty("--theme-secondary-container",THEME.secondaryContainer)
			element.style.setProperty("--theme-on-secondary-container",THEME.onSecondaryContainer)
			element.style.setProperty("--theme-link-color",THEME.link)
			element.style.setProperty("--theme-link-container",THEME.linkContainer)
			element.style.setProperty("--theme-on-link-container",THEME.onLinkContainer)
			element.style.setProperty("--theme-error-color",THEME.error)
			element.style.setProperty("--ds-background-danger",THEME.errorContainer)
			element.style.setProperty("--ds-icon-danger",THEME.error)
			element.style.setProperty("--ds-link",THEME.link)
			element.style.setProperty("--theme-error-container",THEME.errorContainer)
			element.style.setProperty("--theme-on-error-container",THEME.onErrorContainer)
			element.style.setProperty("--theme-hover-color",THEME.linkContainer)
			element.style.setProperty("--ds-background-neutral-bold",THEME.light)
			element.style.setProperty("--theme-muted-color",THEME.onSurface)
			element.style.setProperty("--theme-text-color",THEME.text)
		}
	},[THEME])
	return {
		...THEME
	};
}


const calculateColors = calculate;

export {
	calculateColors,useTheme
}
