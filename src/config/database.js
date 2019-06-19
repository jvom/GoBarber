module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gobarberdb',
  operatorAliases: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
};
