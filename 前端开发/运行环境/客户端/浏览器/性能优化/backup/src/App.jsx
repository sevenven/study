import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import loadable from "@loadable/component";

const primary = "#30929b";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#fff",
    },
    secondary: {
      main: "#000000",
      contrastText: primary,
    },
  },
});

// 使用React-Loadable动态加载组件
const LoadableAbout = loadable(() => import("./About.jsx"), {
  fallback: "<div>loading...</div>",
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.calculatePi(1500); // 测试密集计算对性能的影响
    // 关键性能指标计算
    // window.addEventListener("load", (event) => {
    //   let timing = performance.getEntriesByType("navigation")[0];
    //   console.log(timing);
    //   // TTFB|Time To First Byte
    //   let TTFB = timing.responseStart - timing.requestStart;
    //   // FP|First Paint
    //   let FP = timing.responseEnd - timing.fetchStart;
    //   // TTI| Time to Interactive|可交互时间
    //   let TTI = timing.domInteractive - timing.fetchStart;
    //   // FCP|First Contentful Paint
    //   let FCP = timing.domContentLoadedEventEnd - timing.fetchStart;
    //   // DCL|DOMContentLoaded Event
    //   const DCL = timing.domContentLoadedEventEnd - timing.fetchStart;
    //   // LCP|Largest Contentful Paint
    //   const LCP = timing.domComplete - timing.fetchStart;
    //   // L|Onload Event
    //   const L = timing.loadEventStart - timing.fetchStart;
    //   console.log("TTFB: " + TTFB);
    //   console.log("FP: " + FP);
    //   console.log("TTI: " + TTI);
    //   console.log("FCP: " + FCP);
    //   console.log("DCL: " + DCL);
    //   console.log("LCP: " + LCP);
    //   console.log("L: " + L);
    // });
  }

  calculatePi(duration) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + duration) {
      // TODO(Dereck): figure out the Math problem
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <MuiThemeProvider theme={theme}>
            <div>
              <Header />
              <Route exact path="/" component={Home} />
              <Route path="/about" component={LoadableAbout} />
            </div>
          </MuiThemeProvider>
        </Switch>
      </Router>
    );
  }
}

export default App;
