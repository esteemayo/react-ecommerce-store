function init() {}

function log(error: Error | unknown) {
  console.error(error);
}

const logger = {
  init,
  log,
};

export default logger;
