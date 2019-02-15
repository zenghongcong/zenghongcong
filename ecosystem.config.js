module.exports = {
  apps : [{
    name: 'p',
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
      host : '202.182.113.102',
      ref  : 'origin/master',
      repo : 'git@github.com:zenghongcong/zenghongcong.git',
      path : '/var/www/zenghongcong',
      'post-deploy' : 'npm install && npm run buildd && pm2 reload ecosystem.config.js --env production'
    }
  }
};
