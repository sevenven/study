import { parse } from 'compiler/parser/index'
import { optimize } from 'compiler/optimizer'
import { generate } from 'compiler/codegen'
import { isObject, isFunction, extend } from 'shared/util'
import { isReservedTag } from 'web/util/index'
import { baseOptions } from 'web/compiler/options'
import { BindingTypes } from '../../../../packages/compiler-sfc/src/types'

function assertCodegen(template, generatedCode, ...args) {
  let staticRenderFnCodes: string[] = []
  let generateOptions = baseOptions
  let proc: Function | null = null
  let len = args.length
  while (len--) {
    const arg = args[len]
    if (Array.isArray(arg)) {
      staticRenderFnCodes = arg
    } else if (isObject(arg)) {
      generateOptions = arg
    } else if (isFunction(arg)) {
      proc = arg
    }
  }
  const ast = parse(template, baseOptions)
  optimize(ast, baseOptions)
  proc && proc(ast)
  const res = generate(ast, generateOptions)
  expect(res.render).toBe(generatedCode)
  expect(res.staticRenderFns).toEqual(staticRenderFnCodes)
}

describe('codegen', () => {
  it('generate directive', () => {
    assertCodegen(
      '<p v-custom1:arg1.modifier="value1" v-custom2></p>',
      `with(this){return _c('p',{directives:[{name:"custom1",rawName:"v-custom1:arg1.modifier",value:(value1),expression:"value1",arg:"arg1",modifiers:{"modifier":true}},{name:"custom2",rawName:"v-custom2"}]})}`
    )
  })

  it('generate filters', () => {
    assertCodegen(
      '<div :id="a | b | c">{{ d | e | f }}</div>',
      `with(this){return _c('div',{attrs:{"id":_f("c")(_f("b")(a))}},[_v(_s(_f("f")(_f("e")(d))))])}`
    )
  })

  it('generate filters with no arguments', () => {
    assertCodegen(
      '<div>{{ d | e() }}</div>',
      `with(this){return _c('div',[_v(_s(_f("e")(d)))])}`
    )
  })

  it('generate v-for directive', () => {
    assertCodegen(
      '<div><li v-for="item in items" :key="item.uid"></li></div>',
      `with(this){return _c('div',_l((items),function(item){return _c('li',{key:item.uid})}),0)}`
    )
    // iterator syntax
    assertCodegen(
      '<div><li v-for="(item, i) in items"></li></div>',
      `with(this){return _c('div',_l((items),function(item,i){return _c('li')}),0)}`
    )
    assertCodegen(
      '<div><li v-for="(item, key, index) in items"></li></div>',
      `with(this){return _c('div',_l((items),function(item,key,index){return _c('li')}),0)}`
    )
    // destructuring
    assertCodegen(
      '<div><li v-for="{ a, b } in items"></li></div>',
      `with(this){return _c('div',_l((items),function({ a, b }){return _c('li')}),0)}`
    )
    assertCodegen(
      '<div><li v-for="({ a, b }, key, index) in items"></li></div>',
      `with(this){return _c('div',_l((items),function({ a, b },key,index){return _c('li')}),0)}`
    )
    // v-for with extra element
    assertCodegen(
      '<div><p></p><li v-for="item in items"></li></div>',
      `with(this){return _c('div',[_c('p'),_l((items),function(item){return _c('li')})],2)}`
    )
  })

  it('generate v-if directive', () => {
    assertCodegen(
      '<p v-if="show">hello</p>',
      `with(this){return (show)?_c('p',[_v("hello")]):_e()}`
    )
  })

  it('generate v-else directive', () => {
    assertCodegen(
      '<div><p v-if="show">hello</p><p v-else>world</p></div>',
      `with(this){return _c('div',[(show)?_c('p',[_v("hello")]):_c('p',[_v("world")])])}`
    )
  })

  it('generate v-else-if directive', () => {
    assertCodegen(
      '<div><p v-if="show">hello</p><p v-else-if="hide">world</p></div>',
      `with(this){return _c('div',[(show)?_c('p',[_v("hello")]):(hide)?_c('p',[_v("world")]):_e()])}`
    )
  })

  it('generate v-else-if with v-else directive', () => {
    assertCodegen(
      '<div><p v-if="show">hello</p><p v-else-if="hide">world</p><p v-else>bye</p></div>',
      `with(this){return _c('div',[(show)?_c('p',[_v("hello")]):(hide)?_c('p',[_v("world")]):_c('p',[_v("bye")])])}`
    )
  })

  it('generate multi v-else-if with v-else directive', () => {
    assertCodegen(
      '<div><p v-if="show">hello</p><p v-else-if="hide">world</p><p v-else-if="3">elseif</p><p v-else>bye</p></div>',
      `with(this){return _c('div',[(show)?_c('p',[_v("hello")]):(hide)?_c('p',[_v("world")]):(3)?_c('p',[_v("elseif")]):_c('p',[_v("bye")])])}`
    )
  })

  it('generate ref', () => {
    assertCodegen(
      '<p ref="component1"></p>',
      `with(this){return _c('p',{ref:"component1"})}`
    )
  })

  it('generate ref on v-for', () => {
    assertCodegen(
      '<ul><li v-for="item in items" ref="component1"></li></ul>',
      `with(this){return _c('ul',_l((items),function(item){return _c('li',{ref:"component1",refInFor:true})}),0)}`
    )
  })

  it('generate v-bind directive', () => {
    assertCodegen(
      '<p v-bind="test"></p>',
      `with(this){return _c('p',_b({},'p',test,false))}`
    )
  })

  it('generate v-bind with prop directive', () => {
    assertCodegen(
      '<p v-bind.prop="test"></p>',
      `with(this){return _c('p',_b({},'p',test,true))}`
    )
  })

  it('generate v-bind directive with sync modifier', () => {
    assertCodegen(
      '<p v-bind.sync="test"></p>',
      `with(this){return _c('p',_b({},'p',test,false,true))}`
    )
  })

  it('generate v-model directive', () => {
    assertCodegen(
      '<input v-model="test">',
      `with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(test),expression:"test"}],domProps:{"value":(test)},on:{"input":function($event){if($event.target.composing)return;test=$event.target.value}}})}`
    )
  })

  it('generate multiline v-model directive', () => {
    assertCodegen(
      '<input v-model="\n test \n">',
      `with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(\n test \n),expression:"\\n test \\n"}],domProps:{"value":(\n test \n)},on:{"input":function($event){if($event.target.composing)return;\n test \n=$event.target.value}}})}`
    )
  })

  it('generate multiline v-model directive on custom component', () => {
    assertCodegen(
      '<my-component v-model="\n test \n" />',
      `with(this){return _c('my-component',{model:{value:(\n test \n),callback:function ($$v) {\n test \n=$$v},expression:"\\n test \\n"}})}`
    )
  })

  it('generate template tag', () => {
    assertCodegen(
      '<div><template><p>{{hello}}</p></template></div>',
      `with(this){return _c('div',[[_c('p',[_v(_s(hello))])]],2)}`
    )
  })

  it('generate single slot', () => {
    assertCodegen(
      '<div><slot></slot></div>',
      `with(this){return _c('div',[_t("default")],2)}`
    )
  })

  it('generate named slot', () => {
    assertCodegen(
      '<div><slot name="one"></slot></div>',
      `with(this){return _c('div',[_t("one")],2)}`
    )
  })

  it('generate slot fallback content', () => {
    assertCodegen(
      '<div><slot><div>hi</div></slot></div>',
      `with(this){return _c('div',[_t("default",function(){return [_c('div',[_v("hi")])]})],2)}`
    )
  })

  it('generate slot target', () => {
    assertCodegen(
      '<p slot="one">hello world</p>',
      `with(this){return _c('p',{attrs:{"slot":"one"},slot:"one"},[_v("hello world")])}`
    )
  })

  it('generate scoped slot', () => {
    assertCodegen(
      '<foo><template slot-scope="bar">{{ bar }}</template></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([{key:"default",fn:function(bar){return [_v(_s(bar))]}}])})}`
    )
    assertCodegen(
      '<foo><div slot-scope="bar">{{ bar }}</div></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([{key:"default",fn:function(bar){return _c('div',{},[_v(_s(bar))])}}])})}`
    )
  })

  it('generate named scoped slot', () => {
    assertCodegen(
      '<foo><template slot="foo" slot-scope="bar">{{ bar }}</template></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([{key:"foo",fn:function(bar){return [_v(_s(bar))]}}])})}`
    )
    assertCodegen(
      '<foo><div slot="foo" slot-scope="bar">{{ bar }}</div></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([{key:"foo",fn:function(bar){return _c('div',{},[_v(_s(bar))])}}])})}`
    )
  })

  it('generate dynamic scoped slot', () => {
    assertCodegen(
      '<foo><template :slot="foo" slot-scope="bar">{{ bar }}</template></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([{key:foo,fn:function(bar){return [_v(_s(bar))]}}],null,true)})}`
    )
  })

  it('generate scoped slot with multiline v-if', () => {
    assertCodegen(
      '<foo><template v-if="\nshow\n" slot-scope="bar">{{ bar }}</template></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([{key:"default",fn:function(bar){return (\nshow\n)?[_v(_s(bar))]:undefined}}],null,true)})}`
    )
    assertCodegen(
      '<foo><div v-if="\nshow\n" slot="foo" slot-scope="bar">{{ bar }}</div></foo>',
      `with(this){return _c(\'foo\',{scopedSlots:_u([{key:"foo",fn:function(bar){return (\nshow\n)?_c(\'div\',{},[_v(_s(bar))]):_e()}}],null,true)})}`
    )
  })

  it('generate scoped slot with new slot syntax', () => {
    assertCodegen(
      '<foo><template v-if="show" #default="bar">{{ bar }}</template></foo>',
      `with(this){return _c('foo',{scopedSlots:_u([(show)?{key:"default",fn:function(bar){return [_v(_s(bar))]}}:null],null,true)})}`
    )
  })

  it('generate class binding', () => {
    // static
    assertCodegen(
      '<p class="class1">hello world</p>',
      `with(this){return _c('p',{staticClass:"class1"},[_v("hello world")])}`
    )
    // dynamic
    assertCodegen(
      '<p :class="class1">hello world</p>',
      `with(this){return _c('p',{class:class1},[_v("hello world")])}`
    )
  })

  it('generate style binding', () => {
    assertCodegen(
      '<p :style="error">hello world</p>',
      `with(this){return _c('p',{style:(error)},[_v("hello world")])}`
    )
  })

  it('generate v-show directive', () => {
    assertCodegen(
      '<p v-show="shown">hello world</p>',
      `with(this){return _c('p',{directives:[{name:"show",rawName:"v-show",value:(shown),expression:"shown"}]},[_v("hello world")])}`
    )
  })

  it('generate DOM props with v-bind directive', () => {
    // input + value
    assertCodegen(
      '<input :value="msg">',
      `with(this){return _c('input',{domProps:{"value":msg}})}`
    )
    // non input
    assertCodegen(
      '<p :value="msg"/>',
      `with(this){return _c('p',{attrs:{"value":msg}})}`
    )
  })

  it('generate attrs with v-bind directive', () => {
    assertCodegen(
      '<input :name="field1">',
      `with(this){return _c('input',{attrs:{"name":field1}})}`
    )
  })

  it('generate static attrs', () => {
    assertCodegen(
      '<input name="field1">',
      `with(this){return _c('input',{attrs:{"name":"field1"}})}`
    )
  })

  it('generate events with v-on directive', () => {
    assertCodegen(
      '<input @input="onInput">',
      `with(this){return _c('input',{on:{"input":onInput}})}`
    )
  })

  it('generate events with method call', () => {
    assertCodegen(
      '<input @input="onInput($event);">',
      `with(this){return _c('input',{on:{"input":function($event){return onInput($event);}}})}`
    )
    // empty arguments
    assertCodegen(
      '<input @input="onInput();">',
      `with(this){return _c('input',{on:{"input":function($event){return onInput();}}})}`
    )
    // without semicolon
    assertCodegen(
      '<input @input="onInput($event)">',
      `with(this){return _c('input',{on:{"input":function($event){return onInput($event)}}})}`
    )
    // multiple args
    assertCodegen(
      '<input @input="onInput($event, \'abc\', 5);">',
      `with(this){return _c('input',{on:{"input":function($event){return onInput($event, 'abc', 5);}}})}`
    )
    // expression in args
    assertCodegen(
      '<input @input="onInput($event, 2+2);">',
      `with(this){return _c('input',{on:{"input":function($event){return onInput($event, 2+2);}}})}`
    )
    // tricky symbols in args
    assertCodegen(
      `<input @input="onInput(');[\\'());');">`,
      `with(this){return _c('input',{on:{"input":function($event){onInput(');[\\'());');}}})}`
    )
    // function name including a `function` part (#9920)
    assertCodegen(
      '<input @input="functionName()">',
      `with(this){return _c('input',{on:{"input":function($event){return functionName()}}})}`
    )
  })

  it('generate events with multiple statements', () => {
    // normal function
    assertCodegen(
      '<input @input="onInput1();onInput2()">',
      `with(this){return _c('input',{on:{"input":function($event){onInput1();onInput2()}}})}`
    )
    // function with multiple args
    assertCodegen(
      "<input @input=\"onInput1($event, 'text');onInput2('text2', $event)\">",
      `with(this){return _c('input',{on:{"input":function($event){onInput1($event, 'text');onInput2('text2', $event)}}})}`
    )
  })

  it('generate events with keycode', () => {
    assertCodegen(
      '<input @input.enter="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter"))return null;return onInput.apply(null, arguments)}}})}`
    )
    // multiple keycodes (delete)
    assertCodegen(
      '<input @input.delete="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"]))return null;return onInput.apply(null, arguments)}}})}`
    )
    // multiple keycodes (esc)
    assertCodegen(
      '<input @input.esc="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"esc",27,$event.key,["Esc","Escape"]))return null;return onInput.apply(null, arguments)}}})}`
    )
    // multiple keycodes (space)
    assertCodegen(
      '<input @input.space="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"space",32,$event.key,[" ","Spacebar"]))return null;return onInput.apply(null, arguments)}}})}`
    )
    // multiple keycodes (chained)
    assertCodegen(
      '<input @keydown.enter.delete="onInput">',
      `with(this){return _c('input',{on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter")&&_k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"]))return null;return onInput.apply(null, arguments)}}})}`
    )
    // number keycode
    assertCodegen(
      '<input @input.13="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if(!$event.type.indexOf('key')&&$event.keyCode!==13)return null;return onInput.apply(null, arguments)}}})}`
    )
    // custom keycode
    assertCodegen(
      '<input @input.custom="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"custom",undefined,$event.key,undefined))return null;return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with generic modifiers', () => {
    assertCodegen(
      '<input @input.stop="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){$event.stopPropagation();return onInput.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @input.prevent="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){$event.preventDefault();return onInput.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @input.self="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){if($event.target !== $event.currentTarget)return null;return onInput.apply(null, arguments)}}})}`
    )
  })

  // GitHub Issues #5146
  it('generate events with generic modifiers and keycode correct order', () => {
    assertCodegen(
      '<input @keydown.enter.prevent="onInput">',
      `with(this){return _c('input',{on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter"))return null;$event.preventDefault();return onInput.apply(null, arguments)}}})}`
    )

    assertCodegen(
      '<input @keydown.enter.stop="onInput">',
      `with(this){return _c('input',{on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter"))return null;$event.stopPropagation();return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with mouse event modifiers', () => {
    assertCodegen(
      '<input @click.ctrl="onClick">',
      `with(this){return _c('input',{on:{"click":function($event){if(!$event.ctrlKey)return null;return onClick.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @click.shift="onClick">',
      `with(this){return _c('input',{on:{"click":function($event){if(!$event.shiftKey)return null;return onClick.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @click.alt="onClick">',
      `with(this){return _c('input',{on:{"click":function($event){if(!$event.altKey)return null;return onClick.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @click.meta="onClick">',
      `with(this){return _c('input',{on:{"click":function($event){if(!$event.metaKey)return null;return onClick.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @click.exact="onClick">',
      `with(this){return _c('input',{on:{"click":function($event){if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey)return null;return onClick.apply(null, arguments)}}})}`
    )
    assertCodegen(
      '<input @click.ctrl.exact="onClick">',
      `with(this){return _c('input',{on:{"click":function($event){if(!$event.ctrlKey)return null;if($event.shiftKey||$event.altKey||$event.metaKey)return null;return onClick.apply(null, arguments)}}})}`
    )
  })

  it('generate events with multiple modifiers', () => {
    assertCodegen(
      '<input @input.stop.prevent.self="onInput">',
      `with(this){return _c('input',{on:{"input":function($event){$event.stopPropagation();$event.preventDefault();if($event.target !== $event.currentTarget)return null;return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with capture modifier', () => {
    assertCodegen(
      '<input @input.capture="onInput">',
      `with(this){return _c('input',{on:{"!input":function($event){return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with once modifier', () => {
    assertCodegen(
      '<input @input.once="onInput">',
      `with(this){return _c('input',{on:{"~input":function($event){return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with capture and once modifier', () => {
    assertCodegen(
      '<input @input.capture.once="onInput">',
      `with(this){return _c('input',{on:{"~!input":function($event){return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with once and capture modifier', () => {
    assertCodegen(
      '<input @input.once.capture="onInput">',
      `with(this){return _c('input',{on:{"~!input":function($event){return onInput.apply(null, arguments)}}})}`
    )
  })

  it('generate events with inline statement', () => {
    assertCodegen(
      '<input @input="current++">',
      `with(this){return _c('input',{on:{"input":function($event){current++}}})}`
    )
  })

  it('generate events with inline function expression', () => {
    // normal function
    assertCodegen(
      '<input @input="function () { current++ }">',
      `with(this){return _c('input',{on:{"input":function () { current++ }}})}`
    )
    // normal named function
    assertCodegen(
      '<input @input="function fn () { current++ }">',
      `with(this){return _c('input',{on:{"input":function fn () { current++ }}})}`
    )
    // arrow with no args
    assertCodegen(
      '<input @input="()=>current++">',
      `with(this){return _c('input',{on:{"input":()=>current++}})}`
    )
    // arrow with parens, single arg
    assertCodegen(
      '<input @input="(e) => current++">',
      `with(this){return _c('input',{on:{"input":(e) => current++}})}`
    )
    // arrow with parens, multi args
    assertCodegen(
      '<input @input="(a, b, c) => current++">',
      `with(this){return _c('input',{on:{"input":(a, b, c) => current++}})}`
    )
    // arrow with destructuring
    assertCodegen(
      '<input @input="({ a, b }) => current++">',
      `with(this){return _c('input',{on:{"input":({ a, b }) => current++}})}`
    )
    // arrow single arg no parens
    assertCodegen(
      '<input @input="e=>current++">',
      `with(this){return _c('input',{on:{"input":e=>current++}})}`
    )
    // with modifiers
    assertCodegen(
      `<input @keyup.enter="e=>current++">`,
      `with(this){return _c('input',{on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter"))return null;return (e=>current++).apply(null, arguments)}}})}`
    )
  })

  // #3893
  it('should not treat handler with unexpected whitespace as inline statement', () => {
    assertCodegen(
      '<input @input=" onInput ">',
      `with(this){return _c('input',{on:{"input":onInput}})}`
    )
  })

  it('generate unhandled events', () => {
    assertCodegen(
      '<input @input="current++">',
      `with(this){return _c('input',{on:{"input":function(){}}})}`,
      ast => {
        ast.events.input = undefined
      }
    )
  })

  it('generate multiple event handlers', () => {
    assertCodegen(
      '<input @input="current++" @input.stop="onInput">',
      `with(this){return _c('input',{on:{"input":[function($event){current++},function($event){$event.stopPropagation();return onInput.apply(null, arguments)}]}})}`
    )
  })

  it('generate component', () => {
    assertCodegen(
      '<my-component name="mycomponent1" :msg="msg" @notify="onNotify"><div>hi</div></my-component>',
      `with(this){return _c('my-component',{attrs:{"name":"mycomponent1","msg":msg},on:{"notify":onNotify}},[_c('div',[_v("hi")])])}`
    )
  })

  it('generate svg component with children', () => {
    assertCodegen(
      '<svg><my-comp><circle :r="10"></circle></my-comp></svg>',
      `with(this){return _c('svg',[_c('my-comp',[_c('circle',{attrs:{"r":10}})])],1)}`
    )
  })

  it('generate is attribute', () => {
    assertCodegen(
      '<div is="component1"></div>',
      `with(this){return _c("component1",{tag:"div"})}`
    )
    assertCodegen(
      '<div :is="component1"></div>',
      `with(this){return _c(component1,{tag:"div"})}`
    )
    // maybe a component and normalize type should be 1
    assertCodegen(
      '<div><div is="component1"></div></div>',
      `with(this){return _c('div',[_c("component1",{tag:"div"})],1)}`
    )
  })

  it('generate component with inline-template', () => {
    // have "inline-template'"
    assertCodegen(
      '<my-component inline-template><p><span>hello world</span></p></my-component>',
      `with(this){return _c('my-component',{inlineTemplate:{render:function(){with(this){return _m(0)}},staticRenderFns:[function(){with(this){return _c('p',[_c('span',[_v("hello world")])])}}]}})}`
    )
    // "have inline-template attrs, but not having exactly one child element
    assertCodegen(
      '<my-component inline-template><hr><hr></my-component>',
      `with(this){return _c('my-component',{inlineTemplate:{render:function(){with(this){return _c('hr')}},staticRenderFns:[]}})}`
    )
    assertCodegen(
      '<my-component inline-template></my-component>',
      `with(this){return _c('my-component',{})}`
    )
    // have "is" attribute
    assertCodegen(
      '<div is="myComponent" inline-template><div></div></div>',
      `with(this){return _c("myComponent",{tag:"div",inlineTemplate:{render:function(){with(this){return _c('div')}},staticRenderFns:[]}})}`
    )
    assertCodegen(
      '<div is="myComponent" inline-template></div>',
      `with(this){return _c("myComponent",{tag:"div"})}`
    )
    expect(
      'Inline-template components must have exactly one child element.'
    ).toHaveBeenWarned()
    expect((console.error as any).mock.calls.length).toBe(3)
  })

  it('generate static trees inside v-for', () => {
    assertCodegen(
      `<div><div v-for="i in 10"><p><span></span></p></div></div>`,
      `with(this){return _c('div',_l((10),function(i){return _c('div',[_m(0,true)])}),0)}`,
      [`with(this){return _c('p',[_c('span')])}`]
    )
  })

  it('generate component with v-for', () => {
    // normalize type: 2
    assertCodegen(
      '<div><child></child><template v-for="item in list">{{ item }}</template></div>',
      `with(this){return _c('div',[_c('child'),_l((list),function(item){return [_v(_s(item))]})],2)}`
    )
  })

  it('generate component with comment', () => {
    const options = extend(
      {
        comments: true
      },
      baseOptions
    )
    const template = '<div><!--comment--></div>'
    const generatedCode = `with(this){return _c('div',[_e("comment")])}`

    const ast = parse(template, options)
    optimize(ast, options)
    const res = generate(ast, options)
    expect(res.render).toBe(generatedCode)
  })

  // #6150
  it('generate comments with special characters', () => {
    const options = extend(
      {
        comments: true
      },
      baseOptions
    )
    const template = "<div><!--\n'comment'\n--></div>"
    const generatedCode = `with(this){return _c('div',[_e("\\n'comment'\\n")])}`

    const ast = parse(template, options)
    optimize(ast, options)
    const res = generate(ast, options)
    expect(res.render).toBe(generatedCode)
  })

  // #8041
  it('does not squash templates inside v-pre', () => {
    const template = '<div v-pre><template><p>{{msg}}</p></template></div>'
    const generatedCode = `with(this){return _m(0)}`
    const renderFn = `with(this){return _c('div',{pre:true},[_c('template',[_c('p',[_v("{{msg}}")])])],2)}`
    const ast = parse(template, baseOptions)
    optimize(ast, baseOptions)
    const res = generate(ast, baseOptions)
    expect(res.render).toBe(generatedCode)
    expect(res.staticRenderFns).toEqual([renderFn])
  })

  it('not specified ast type', () => {
    const res = generate(undefined, baseOptions)
    expect(res.render).toBe(`with(this){return _c("div")}`)
    expect(res.staticRenderFns).toEqual([])
  })

  it('not specified directives option', () => {
    assertCodegen(
      '<p v-if="show">hello world</p>',
      `with(this){return (show)?_c('p',[_v("hello world")]):_e()}`,
      { isReservedTag }
    )
  })

  // #9142
  it('should compile single v-for component inside template', () => {
    assertCodegen(
      `<div><template v-if="ok"><foo v-for="i in 1" :key="i"></foo></template></div>`,
      `with(this){return _c('div',[(ok)?_l((1),function(i){return _c('foo',{key:i})}):_e()],2)}`
    )
  })

  it('component with bindings ', () => {
    const ast = parse(`<div><Foo/><foo-bar></foo-bar></div>`, baseOptions)
    optimize(ast, baseOptions)
    const res = generate(ast, {
      ...baseOptions,
      bindings: {
        Foo: BindingTypes.SETUP_CONST,
        FooBar: BindingTypes.SETUP_CONST
      }
    })
    expect(res.render).toMatchInlineSnapshot(
      '"with(this){return _c(\'div\',[_c(Foo),_c(FooBar)],1)}"'
    )
  })

  // #12674
  it('component with bindings: should not resolve native elements', () => {
    const ast = parse(`<div><form>{{ n }}</form></div>`, baseOptions)
    optimize(ast, baseOptions)
    const res = generate(ast, {
      ...baseOptions,
      bindings: {
        form: BindingTypes.SETUP_CONST
      }
    })
    expect(res.render).toMatch(`_c('form'`)
    expect(res.render).toMatchInlineSnapshot(
      "\"with(this){return _c('div',[_c('form',[_v(_s(n))])])}\""
    )
  })
})
