const sourcemap = true;
const name = 'GoldenLayout';
const globals = {
    'jquery': '$',
    'react': 'React',
    'react-dom': 'ReactDOM'
};

export default {
    input: 'src/js/index.js',
    plugins: [],
    external: [ 'jquery', 'react', 'react-dom' ],
    output: [
        { file: 'dist/goldenlayout.js', format: 'umd', sourcemap, name, globals },
        { file: 'dist/goldenlayout.cjs.js', format: 'cjs', sourcemap, name },
        { file: 'dist/goldenlayout.es.js', format: 'es', sourcemap, name }
    ]
}
