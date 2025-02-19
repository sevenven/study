// const input = `
// p-reduce-2.1.0
// p-pipe-3.1.0
// `;

// // 将输入字符串按行分割成数组
// const lines = input.trim().split('\n');

// // 转换为目标格式
// const packages = lines.map(line => {
// 	const lastDashIndex = line.lastIndexOf('-'); // 找到最后一个 - 的位置
// 	const name = line.slice(0, lastDashIndex); // 提取包名
// 	const version = line.slice(lastDashIndex + 1); // 提取版本号
// 	return { name, version };
// });

// console.log(packages);

const input = `
semver/semver-7.7.1
codemirror/codemirror-5.65.18
@antv/l7-source/l7-source-2.22.3
@antv/l7-utils/l7-utils-2.22.3
@antv/l7-map/l7-map-2.22.3
@antv/l7-scene/l7-scene-2.22.3
@antv/l7-renderer/l7-renderer-2.22.3
@antv/l7-maps/l7-maps-2.22.3
@antv/l7/l7-2.22.3
@antv/g2plot/g2plot-2.4.32
@antv/l7plot-component/l7plot-component-0.0.11
@antv/g-device-api/g-device-api-1.6.13
@antv/l7-component/l7-component-2.22.3
@antv/l7plot/l7plot-0.5.11
@antv/l7-layers/l7-layers-2.22.3
@antv/l7-core/l7-core-2.22.3
@antv/x6/x6-1.35.1
@antv/hierarchy/hierarchy-0.6.14
@antv/x6-react-shape/x6-react-shape-1.6.6
@babel/plugin-proposal-private-property-in-object/plugin-proposal-private-property-in-object-7.21.11
@babel/runtime-corejs3/runtime-corejs3-7.26.7
@types/jquery/jquery-3.5.32
@types/react-dom/react-dom-18.0.11
@types/d3-path/d3-path-3.1.1
@types/d3-scale-chromatic/d3-scale-chromatic-3.1.0
@types/d3-shape/d3-shape-3.1.7
@types/d3-timer/d3-timer-3.0.2
@types/d3-scale/d3-scale-4.0.9
@types/d3-time/d3-time-3.0.4
@types/geojson/geojson-7946.0.16
@types/node/node-20.5.1
@types/node/node-22.13.1
@types/sizzle/sizzle-2.3.9
@types/d3-transition/d3-transition-3.0.9
@types/express-serve-static-core/express-serve-static-core-5.0.6
@types/d3-selection/d3-selection-3.0.11
@types/react/react-18.0.28
@jridgewell/trace-mapping/trace-mapping-0.3.9
@npmcli/promise-spawn/promise-spawn-6.0.2
@npmcli/run-script/run-script-6.0.2
@commitlint/cli/cli-17.8.1
@commitlint/config-conventional/config-conventional-17.8.1
@commitlint/config-validator/config-validator-17.8.1
@commitlint/execute-rule/execute-rule-17.8.1
@commitlint/is-ignored/is-ignored-17.8.1
@commitlint/ensure/ensure-17.8.1
@commitlint/load/load-17.8.1
@commitlint/lint/lint-17.8.1
@commitlint/format/format-17.8.1
@commitlint/read/read-17.8.1
@commitlint/parse/parse-17.8.1
@commitlint/types/types-17.8.1
@commitlint/top-level/top-level-17.8.1
@commitlint/to-lines/to-lines-17.8.1
@commitlint/rules/rules-17.8.1
@commitlint/resolve-extends/resolve-extends-17.8.1
@commitlint/message/message-17.8.1
@cspotcode/source-map-support/source-map-support-0.8.1
@tsconfig/node10/node10-1.0.11
@tsconfig/node12/node12-1.0.11
@tsconfig/node14/node14-1.0.3
@tsconfig/node16/node16-1.0.4
`;

// 将输入字符串按行分割成数组
const lines = input.trim().split('\n');

// 转换为目标格式
const packages = lines.map(line => {
	const lastSlashIndex = line.lastIndexOf('/'); // 找到最后一个 / 的位置
	const lastDashIndex = line.lastIndexOf('-'); // 找到最后一个 - 的位置
	const name = line.slice(0, lastSlashIndex); // 提取包名
	const version = line.slice(lastDashIndex + 1); // 提取版本号
	return { name, version };
});

console.log(packages);
