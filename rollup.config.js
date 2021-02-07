import babel from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import sourcemaps from "rollup-plugin-sourcemaps";
import {terser} from "rollup-plugin-terser";

export default (args) => {
    const watch = !!args.watch;
    return [
        {
            input: "src/js/index.js",
            output: {
                sourcemap: true,
                file: "dist/umd/iexjs.js",
            },
            plugins: [
                babel({
                    exclude: "node_modules/**",
                    babelHelpers: "bundled",
                }),
                filesize(),
                watch ? livereload("dist") : terser(),
                postcss({
                    inject: false,
                    sourceMap: watch,
                    minimize: !watch,
                }),
                sourcemaps(),
            ].filter((x) => x),
            watch: {
                clearScreen: false,
            },
        },
    ];
};
