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
      host : '139.180.134.229',
      ref  : 'origin/master',
      repo : 'git@github.com:zenghongcong/zenghongcong.git',
      path : '/var/www/zenghongcong',
      'post-deploy' : 'npm install && npm run build'
    }
  }
};
