require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './build/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:DariaPrindina/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -Crv .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend && scp -Crv .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': `cd ${DEPLOY_PATH}/source/backend && npm i && npm run build && pm2 restart ecosystem.config.js`,
    },
  },
};
