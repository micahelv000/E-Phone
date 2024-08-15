module.exports = {
    apps: [
        {
            name: 'client',
            script: 'npm',
            args: 'start --workspace=client',
            env: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'server',
            script: 'npm',
            args: 'start --workspace=server',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};