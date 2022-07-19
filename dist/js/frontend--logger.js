(function () {


	const Type = {
		success: 'success',
		error: 'error',
		info: 'info',
		node: 'node',
		data: 'data',
		user: 'user',
		server: 'server',
		object: 'object',
	}


	const COLOR = {
		[Type.success]: '#3BB54A',
		[Type.error]: '#E6021F',
		[Type.info]: '#8395a7',
		[Type.node]: '#ff9f1a',
		[Type.data]: '#c56cf0',
		[Type.user]: '#18dcff',
		[Type.server]: '#3867d6',
	}

	const ICON = {
		[Type.success]: 'https://www.flaticon.com/svg/static/icons/svg/753/753318.svg',
		[Type.error]: 'https://www.flaticon.com/svg/static/icons/svg/753/753345.svg',
		[Type.info]: 'https://www.flaticon.com/svg/static/icons/svg/1041/1041728.svg',
		[Type.node]: 'https://www.flaticon.com/svg/static/icons/svg/3721/3721643.svg',
		[Type.data]: 'https://www.flaticon.com/svg/static/icons/svg/138/138928.svg',
		[Type.user]: 'https://www.flaticon.com/svg/static/icons/svg/1541/1541409.svg',
		[Type.server]: 'https://www.flaticon.com/svg/static/icons/svg/3658/3658730.svg',
	}

	function debug(message, type, ...value) {
		const output = value ? value : '';
		type = type || Type.info;
		console.log(
			'%c%s%c%s',
			`color:#fff;
			background: ${COLOR[type]} url(${ICON[type]}) no-repeat 10px center / 20px 20px;
			text-transform:lowercase;
			padding: 0 15px 0 40px;
			line-height:30px;
			border-radius:5px;
			margin-right:15px;`,
			type,
			`color:${COLOR[type]};
			font-weight:500;
			font-size:15px`,
			message + '\n\n',
			...output,
			'\n'
		);

	}

	const Logger = {
		type: Type,
		debug
	}


	window.Logger = Logger;

})();