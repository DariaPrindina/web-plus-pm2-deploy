require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-frontend',
    script: './build/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/DariaPrindina/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': `cd ${DEPLOY_PATH}/source/frontend && npm i && npm run build && pm2 restart ecosystem.config.js `,
    },
  },
};
