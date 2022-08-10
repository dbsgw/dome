/**
 * 判断两数组字符串是否相同（用于按钮权限验证），数组字符串中存在相同时会自动去重（按钮权限标识不会重复）
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
// 判断两数组字符串是否相同 : 去重=>判断长度是否相同
export function judementSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
	// 数组去重
	const news = removeDuplicate(newArr);
	// 数组去重
	const olds = removeDuplicate(oldArr);
	let count = 0;
	const leng = news.length;
	for (let i in olds) {
		for (let j in news) {
			if (olds[i] === news[j]) count++;
		}
	}
	// 利用数组的长度是否相等  去重
	return count === leng ? true : false;
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
// 判断对象是否相同: 去重=>通过hasOwnProperty判断key是否存在=>判断是对象就递归,不是对象就比较key
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {

	// 判断 a 和 b 对象是否存在
	if (!a || !b) return false;
	// 在给定对象上找到的自身属性对应的字符串数组。
	let aProps = Object.getOwnPropertyNames(a);
	// 在给定对象上找到的自身属性对应的字符串数组。
	let bProps = Object.getOwnPropertyNames(b);
	// 判断 对象的key 的长度 是否相等
	if (aProps.length != bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let propA = a[propName];
		let propB = b[propName];
		// hasOwnProperty表示是否有自己的属性。这个方法会查找一个对象是否有某个属性，但是不会去查找它的原型链。
		// 在b对象上查找  是否有 a对象的第一个key,没有就false
		if (!b.hasOwnProperty(propName)) return false;
		// 判断 propA 是否是对象 是对象就递归继续执行
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false;
			// 不是对象 就继续比对 两个key 是否相同
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
}

/**
 * 数组、数组对象去重
 * @param arr 数组内容
 * @param attr 需要去重的键值（数组对象）
 * @returns
 */

// 数组去重:new Set()
export function removeDuplicate(arr: any, attr?: string) {
	if (!arr && !arr.length) {
		return arr;
	} else {
		if (attr) {
			// attr 这key的值去重
			const obj: any = {};
			const newArr = arr.reduce((cur: any, item: any) => {
				obj[item[attr]] ? '' : (obj[item[attr]] = true && item[attr] && cur.push(item));
				return cur;
			}, []);
			return newArr;
		} else {
			return Array.from(new Set([...arr]));
		}
	}
}
