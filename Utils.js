
let timer;

const debounce = (func,time=400) => {
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			func.apply(null,args);
		}, time);
	};
};

const DownloadCsv = (filename, rows) => {
	var processRow = function (row) {
		var finalVal = '';
		for (var j = 0; j < row.length; j++) {
			var innerValue = row[j] === null ? '' : `${row[j]}`;
			if (row[j] instanceof Date) {
				innerValue = row[j].toLocaleString();
			}
			;
			var result = innerValue.replace(/"/g, '""');
			if (result.search(/("|,|\n)/g) >= 0)
				result = '"' + result + '"';
			if (j > 0)
				finalVal += ',';
			finalVal += result;
		}
		return finalVal + '\n';
	};

	var csvFile = '';
	for (var i = 0; i < rows.length; i++) {
		csvFile += processRow(rows[i]);
	}

	var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}

const DownloadDirectCsv = (filename, r) => {
	var blob = new Blob([r], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}

const DownloadText = (filename,r) => {
	const file = new Blob([r], {type: 'text/plain'});
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(file, filename);
	} else {
		const element = document.createElement("a");
		if(element.download !== undefined) {
			element.href = URL.createObjectURL(file);
			element.download =filename;
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		}

	}


}

function searchValue(val, arr, keys) {
    if(val){
        val = val.toLowerCase()
		let filtered = []
		arr.forEach(element => {
			let exists = false
			keys.forEach(key => {
				let nestedKeys = key.split('.')
				if(!exists){
					let nestedElement = element
					nestedKeys.forEach(node => {
						nestedElement = nestedElement[node]
					});
					if(nestedElement.toString().toLowerCase().includes(val)){
						filtered.push(element)
						exists = true
					}
				}
			});
		});
        return filtered
    }else{
        return arr
    }
}

const sanitizeInput = (value) => {
	const HtmlRegex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
	const SpecialRegex = /[&\/\\#,+()$~%'":*?<>{}]/g;

	let sanitized = value.replace(HtmlRegex, '')
	sanitized = sanitized.replace(SpecialRegex, '')
	return sanitized
}

const sortItems = (arr, type, key, nested) => {

	if(!type){
		return arr
	}
	if(nested){
		if(key){
			if(type === 'asc'){
				return arr.sort((a, b) => (a[nested][key] > b[nested][key]) ? 1: -1);
			}else{
				return arr.sort((a, b) => (a[nested][key] < b[nested][key]) ? 1: -1);
			}
		}else{
			if(type === 'asc'){
				return arr.sort((a, b) => (a[nested] > b[nested]) ? 1: -1);
			}else{
				return arr.sort((a, b) => (a[nested] < b[nested]) ? 1: -1);
			}
		}
	}else{
		if(key){
			if(type === 'asc'){
				return arr.sort((a, b) => (a[key] > b[key]) ? 1: -1);
			}else{
				return arr.sort((a, b) => (a[key] < b[key]) ? 1: -1);
			}
		}else{
			if(type === 'asc'){
				return arr.sort((a, b) => (a > b) ? 1: -1);
			}else{
				return arr.sort((a, b) => (a < b) ? 1: -1);
			}
		}
	}
}



export {
	debounce,DownloadCsv, DownloadDirectCsv,DownloadText, searchValue, sanitizeInput, sortItems
}
