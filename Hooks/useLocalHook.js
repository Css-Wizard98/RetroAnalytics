export default function useLocalHook(){
	let origin = window.location;
	return origin.hostname === "localhost";
}
