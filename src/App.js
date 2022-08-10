import { useState } from 'react';
import Circle from './components/Circle';

function App() {
	const [touches, setTouches] = useState([]);


	const hanldeTouchStart = e => {
		console.log('e.touches: ', e.touches);
		setTouches([...e.touches]);
	};
	const hanldeTouchEnd = e => {
		setTouches([...e.touches]);
	};
	const hanldeTouchMove = e => {
		setTouches([...e.touches]);

	};

	return (
		<div
			className='app'
			onTouchStart={hanldeTouchStart}
			onTouchEnd={hanldeTouchEnd}
			onTouchMove={hanldeTouchMove}>
			<h1>Hello v - 1</h1>
			{touches.length > 0 && touches.map(touch => (
				<Circle touch={touch} key={touch.identifier}/>
			))}
		</div>
	);
}

export default App;
