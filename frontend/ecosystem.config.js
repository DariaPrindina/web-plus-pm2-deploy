require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO,
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `npm run build && scp -i ~/.ssh/id_rsa.pub -Cr build ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/frontend`,
      'post-deploy': 'pm2 restart ecosystem.config.js',
    },
  },
};
