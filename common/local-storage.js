// 从LocalStorage中获取登陆用户信息
export const getLocalStorage = (...args) => {
	const storage = {};
	args.forEach(arg => {
		storage[arg] = window.localStorage.getItem(arg) || null;
	});
	return storage;
};

// 将用户登陆信息写入LocalStorage
export const setLocalStorage = data => {
	Object.keys(data).forEach(prop => {
		const el = data[prop];
		window.localStorage.setItem(prop, el);
	});
};

export const removeLocalStorage = (...args) => {
	args.forEach(arg => {
		window.localStorage.removeItem(arg);
	});
};
