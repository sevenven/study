function Header() {
	let dom = document.getElementById('root');
	let header = document.createElement('div');
	header.innerText = 'header';
	dom.append(header);
}

// module.exports = Header;
export default Header;
