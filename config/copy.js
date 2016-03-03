module.exports = {
    test: {
        files: [
            {
                src: 'src/index.html',
                dest: 'build/test/index.html'
            },
			{
				src: 'src/boot.html',
				dest: 'build/test/boot.html'
			},
            {
                expand: true,
                cwd: 'src/public/',
                src: ['**'],
                dest: 'build/test/'
            }
        ]
    },
    dev: {
        files: [
            {
                src: 'src/index.html',
                dest: 'build/dev/index.html'
            },
			{
				src: 'src/boot.html',
				dest: 'build/dev/boot.html'
			},
            {
                expand: true,
                cwd: 'src/public/',
                src: ['**'],
                dest: 'build/dev/'
            }
        ]
    },
    deploy:  {
        files: [
            {
                src: 'src/index.html',
                dest: 'build/deploy/index.html'
            },
			{
				src: 'src/boot.html',
				dest: 'build/deploy/boot.html'
			},
            {
                expand: true,
                cwd: 'src/public/',
                src: ['**'],
                dest: 'build/deploy/'
            }
        ]
    }
};