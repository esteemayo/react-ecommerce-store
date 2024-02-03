function init() {}

function log(error: Error) {
  console.error(error);
}

const logger = {
  init,
  log,
};

export default logger;
