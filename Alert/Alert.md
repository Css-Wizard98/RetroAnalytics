React component example:

```html
import Button from '../Button/Button';
import Theme from '../Theme/Theme';
<div>
    <Theme/>
	<Button onClick={()=>{
		TOAST().success("Testing")
	}} className="btn-success" margin="mt0">sample button</Button>
</div>
```
