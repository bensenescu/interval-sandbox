# Interval Sandbox

This hosts Interval via SST (see [interval.com](https://interval.com). This is used for testing purposes to make SST Feature Flag easier to test and use.

This is a minimal setup to host Interval, and is not intended to be a production purposes. Additionally, it
only has the minimum dependencies.

Further instructions for configuring more Interval features can be found in the
[Interval project](https://github.com/interval/server).

## Note on setting up Postgres

If your postgres database comes with a database already created by default, pass in the `--skip-create` flag to the `interval-server db-init` command. Additionally, I initialized the db from my local machine which meant that I
had to create a `.env` file in addition to adding the secrets to sst.
