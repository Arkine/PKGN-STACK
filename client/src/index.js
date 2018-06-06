import { h, render } from 'preact';
 
const renderApp = render(
	(
    <div id="foo">
        <span>Hello, world!</span>
        <button onClick={ e => alert("hi!") }>Click Me</button>
    </div>
	), 
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./', () => renderApp());
}