const squareConnect = require('square-connect');
const dotenv = require('dotenv');

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;
const catalog_api = new squareConnect.CatalogApi();

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

//List all items in store
exports.list_catalog = async function (req, res) {
	try {
		const response = await catalog_api.listCatalog();
		console.log(response.objects[1].id);
		res.send(response);
	} catch (error) {
		res.send(error);
	}
};
