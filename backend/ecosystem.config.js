require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO,
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
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': `export PATH=$PATH:/home/megadaria2015/.nvm/versions/node/v21.7.3/bin && cd ${DEPLOY_PATH}/source/backend && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production`,
    },
  },
};
