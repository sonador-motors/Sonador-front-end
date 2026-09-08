'use client'

import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const NagoyaTime = () => {
	const [currentTime, setCurrentTime] = useState(() => {
		try {
			dayjs().tz('Asia/Tokyo')
		} catch { return dayjs() }
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(dayjs().tz('Asia/Tokyo'));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const formattedTime = currentTime?.format('hh:mm A');

	return (
		<section className='bg-sky-700 text-sky-200 z-30 fixed w-full'>
			<p className='font-bold text-center py-1'>Current Time in Nagoya, Japan: {formattedTime}</p>
		</section>
	);
};

export default NagoyaTime;