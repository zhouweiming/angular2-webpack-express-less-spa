let gulp = require('gulp');

let current_dir = process.cwd().replace("/src", "");
let source_dir = `${current_dir}/src/`;
let target_dev_dir = `${current_dir}/dev_home/`;
let target_prod_dir = `${current_dir}/build/`;
let target_dir = process.argv[2] === "build-prod-codes" ? target_prod_dir : target_dev_dir;

gulp.task("copy-source-dev", () => {
  return gulp.src([
    `${source_dir}/**/*`,
    `!${source_dir}node_modules`, `!${source_dir}node_modules/**/*`,
    `!${source_dir}typings`, `!${source_dir}typings/**/*`
    ], { base: source_dir }).pipe(gulp.dest(`${target_dir}`));
});


gulp.task("default", ["copy-source-dev"], () => {
  let server_watcher = gulp.watch([
    `${source_dir}/**/*`,
    `!${source_dir}node_modules`, `!${source_dir}node_modules/**/*`,
    `!${source_dir}typings`, `!${source_dir}typings/**/*`
  ]);

  server_watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.src([event.path], { base: source_dir }).pipe(gulp.dest(`${target_dir}`));
  });

  console.log("start watch");
});