import { useState, useEffect } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);

	const handleTouch = e => {
		setTouches([...e.touches]);
	};
	console.log('rerender app');

	useEffect(() => {
		window.addEventListener('touchstart', handleTouch);
		window.addEventListener('touchcancel', handleTouch);
		window.addEventListener('touchmove', handleTouch);

		return () => {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchcancel', handleTouch);
			window.removeEventListener('touchmove', handleTouch);
		};
	}, []);

	return (
		<div className='app'>
			<h1 className={`title${touches.length > 0 ? ' fade-out' : ''}`}>
				Touch the screen
			</h1>
			{touches.length > 0 &&
				touches.map(touch => <Circle touch={touch} key={touch.identifier} />)}
		</div>
	);
}

export default App;
