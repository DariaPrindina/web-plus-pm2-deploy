require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH,
} = process.env;

export const apps = [{
  name: 'mesto-frontend',
  script: './build/app.js',
}];

export const deploy = {
  production: {
    user: DEPLOY_USER,
    host: DEPLOY_HOST,
    ref: DEPLOY_REF,
    repo: 'https://github.com/DariaPrindina/web-plus-pm2-deploy.git',
    path: DEPLOY_PATH,
    'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/frontend`,
    'post-deploy': `cd ${DEPLOY_PATH}/frontend && npm i && npm run build && pm2 restart ecosystem.config.js `,
  },
};
