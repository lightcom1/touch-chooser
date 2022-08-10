import { useState } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);

	const hanldeTouch = e => {
		setTouches([...e.touches]);
	};

	return (
		<div
			className='app'
			onTouchStart={hanldeTouch}
			onTouchEnd={hanldeTouch}
			onTouchMove={hanldeTouch}>
			<h1 className={`title${touches.length > 0 ? ' fade-out' : ''}`}>
				Touch the screen
			</h1>
			{touches.length > 0 &&
				touches.map(touch => <Circle touch={touch} key={touch.identifier} />)}
		</div>
	);
}

export default App;
