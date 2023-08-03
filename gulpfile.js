const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const ts = require('gulp-typescript');
const babel = require("gulp-babel");

const LIB_HOME = path.join("app/lib");

gulp.task("build", async () => {
    if (!fs.existsSync("dist")) {
        fs.mkdirSync("dist");
    }
    const info = JSON.parse(fs.readFileSync("package.json"));
    const {
        name,
        version,
        repository,
        author,
        license,
        keywords,
		description
    } = info;

    gulp.src(LIB_HOME + "/**/*.ts")
        .pipe(ts({
            noImplicitAny: true,
            allowSyntheticDefaultImports: true,
            moduleResolution: "node",
            declaration: true,
            target: "es6"
        }))
        .pipe(gulp.dest(`dist`));

    gulp.src("LICENSE")
        .pipe(gulp.dest("dist"));

    gulp.src("README.md")
        .pipe(gulp.dest("dist"));

    gulp.src("app/tsconfig.json")
        .pipe(gulp.dest(`dist`));

    gulp.src(LIB_HOME + "**/*.d.ts")
        .pipe(gulp.dest(`dist`));

    fs.writeFileSync("dist/package.json", JSON.stringify({
        name,
        version,
        repository,
        author,
        license,
        keywords,
		description
    }, null, 2), {
        flag: "w"
    });
});
