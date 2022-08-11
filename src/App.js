import { useState, useEffect } from 'react';
import Circle from './components/Circle';
import './app.scss';

function App() {
	const [touches, setTouches] = useState([]);

	const handleTouch = e => {
		setTouches([...e.touches]);
	};

	useEffect(() => {
		window.addEventListener('touchstart', handleTouch);
		window.addEventListener('touchend', handleTouch);
		window.addEventListener('touchcancel', handleTouch);
		window.addEventListener('touchmove', handleTouch);

		return () => {
			window.removeEventListener('touchstart', handleTouch);
			window.removeEventListener('touchend', handleTouch);
			window.removeEventListener('touchcancel', handleTouch);
			window.removeEventListener('touchmove', handleTouch);
		};
	}, []);

	
	const chooseWinner = () => {
		const winner = touches[Math.floor(Math.random() * touches.length)];
		console.log('winner: ', winner);
		
	};

	useEffect(() => {
		console.log('touches event');


		let timer = null;

		if (touches.length > 1) {
			clearTimeout(timer);

			timer = setTimeout(() => {
				chooseWinner();
				console.log('touches', touches);
			}, 3000);
		}

		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [touches.length]);

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
