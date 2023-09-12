const gulp = require("gulp");
const fs = require("fs");
const path = require("path");
const ts = require('gulp-typescript');
const babel = require("gulp-babel");

const LIB_HOME = path.join("lib");

function copyFile(location, targetSubDir) {
    const dir = path.dirname(location);
    const dest = [
        `web/${targetSubDir}/`.replace(/\\/g, "/"),
        `app/${targetSubDir}/`.replace(/\\/g, "/")
    ];
    const index = dir.indexOf(targetSubDir);
    if (index >= 0) {
        const iDir = index + targetSubDir.length;
        const sub = dir.substring(iDir + 1);
        dest.forEach(i => {
            gulp.src(location, {
                base: dir
            }).pipe(gulp.dest(i + sub));
        });
    }
}

function deleteFile(location, targetSubDir) {
    const dest = [
        `app/${targetSubDir}/`.replace(/\\/g, "/"),
        `web/${targetSubDir}/`.replace(/\\/g, "/")
    ];
    dest.forEach(i => {
        fs.unlink(i + location, function () {
            console.log(`unlink "${location}"`);
        });
    });
}

gulp.task("deploy", async () => {
    gulp.src(LIB_HOME + "/**/*.ts", {
        base: LIB_HOME
    }).pipe(gulp.dest(`app/lib`)).pipe(gulp.dest(`web/lib`));
});

gulp.task("dev", gulp.series(["deploy"], async () => {
    const libWatcher = gulp.watch(LIB_HOME);
    libWatcher.on("change", function (location, stats) {
        copyFile(location, "lib");
    });

    libWatcher.on("add", function (location, stats) {
        copyFile(location, "lib");
    });

    libWatcher.on("unlink", function (location, stats) {
        deleteFile(location, "lib");
    });
}));

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
