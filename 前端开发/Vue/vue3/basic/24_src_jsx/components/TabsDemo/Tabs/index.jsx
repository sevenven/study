import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Tabs",
  props: ["defaultActiveKey"],
  emits: ["change"],
  setup(props, context) {
    const children = context.slots.default();
    const titles = children.map((panel) => {
      const { key, title } = panel.props || {};
      return {
        key,
        title,
      };
    });

    // 当前 actKey
    const actKey = ref(props.defaultActiveKey);
    function changeActKey(key) {
      actKey.value = key;
      context.emit("change", key);
    }

    // jsx
    return () => (
      <>
        <div>
          {/* 渲染 buttons */}
          {titles.map((titleInfo) => {
            const { key, title } = titleInfo;
            return (
              <button
                key={key}
                style={{ color: actKey.value === key ? "blue" : "#333" }}
                onClick={() => changeActKey(key)}
              >
                {title}
              </button>
            );
          })}
        </div>

        <div>
          {children.filter((panel) => {
            const { key } = panel.props || {};
            if (actKey.value === key) return true; // 匹配上 key ，则显示
            return false; // 否则，隐藏
          })}
        </div>
      </>
    );
  },
});
