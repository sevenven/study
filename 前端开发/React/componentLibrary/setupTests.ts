import '@testing-library/jest-dom';

// 扩展 Jest 的匹配器类型
declare global {
	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
		}
	}
}
