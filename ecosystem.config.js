module.exports = {
  apps : [{
    name: 'zenghongcong',
    env: {
      COMMON_VARIABLE: 'true'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '207.148.74.123',
      ref  : 'origin/master',
      repo : 'git@github.com:zenghongcong/zenghongcong.git',
      path : '/www/zenghongcong',
      'post-deploy' : 'npm install && npm run build'
    }
  }
};
