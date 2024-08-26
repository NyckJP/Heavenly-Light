const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/Heavenly-Light_development",
      test: "postgres://postgres:postgres@localhost:5432/Heavenly-Light_test",
      e2e: "postgres://postgres:postgres@localhost:5432/Heavenly-Light_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
