import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

export default [
  {
    input: pkg.source,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: false,
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: false,
      },
    ],
    plugins: [
      external(),
      babel({
        exclude: "node_modules/**",
      }),
      del({ targets: ["dist/*"] }),
      typescript(),
      postcss({
        modules: true,
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
  {
    input: pkg.source,
    output: [{ file: pkg.types, format: "es" }],
    plugins: [
      external(),
      dts({
        compilerOptions: {
          baseUrl: "./src",
        },
      }),
    ],
  },
];
