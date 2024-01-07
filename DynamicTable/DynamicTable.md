### Table Input

```js
import {DynamicTable} from './DynamicTable';

<div>
	<Table title='Sample Table' description='This is a sample table description'
		   headers={['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5']}
		   rows={[
			   [0, 'Sample Value', 'Sample Value', 'Sample Value', 'Sample Value'],
			   [2, 'Sample Value', 'Sample Value', 'Sample Value', 'Sample Value'],
			   [3, 'Sample Value', 'Sample Value', 'Sample Value', 'Sample Value'],
			   [1, 'Sample Value', 'Sample Value', 'Sample Value', 'Sample Value'],
			   [9, 'Sample Value', 'Sample Value', 'Sample Value', 'Sample Value'],
		   ]}
		   actions={[{
			   label: 'Edit', onClick: () => {
			   }
		   }, {
			   label: 'Delete', onClick: () => {
			   }
		   }]}
		   filters={['First', 'Second', 'Third', 'Fourth']}
	/>
</div>
```
---
