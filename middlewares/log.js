/**
 *
 * @param req {Request}
 * @param res {Response}
 * @param next {Function}
 * @returns {Promise<void>}
 */
async function log(req, res, next) {
    console.log(`${new Date(Date.now()).toDateString()}: Route: ${req.url}, method: ${req.method}`);
    next();
}

module.exports = {log};
