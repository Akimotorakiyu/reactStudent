// rollup.config.js
import * as rollup from "rollup";
import json from "rollup-plugin-json";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";

const inputOptions: rollup.InputOptions = {
  input: "src/index.ts",
  plugins: [resolve(), typescript(), json()]
};

const outputOptions: rollup.OutputOptions = {
  file: "dist/bundle.js",
  format: "cjs",
  sourcemap: true
};

async function build() {
  try {
    const res = await rollup.rollup(inputOptions);

    await res.write(outputOptions);

    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

// build();

const watchOptions: rollup.RollupWatchOptions = {
  ...inputOptions,
  output: outputOptions
};

async function watch() {
  try {
    const watcher = await rollup.watch([watchOptions]);
    watcher.on("event", event => {
      // event.code 会是下面其中一个：
      //   START        — 监听器正在启动（重启）
      //   BUNDLE_START — 构建单个文件束
      //   BUNDLE_END   — 完成文件束构建
      //   END          — 完成所有文件束构建
      //   ERROR        — 构建时遇到错误
      //   FATAL        — 遇到无可修复的错误

      console.log(event);
    });
  } catch (error) {
    console.error(error);
  }
}

watch();
