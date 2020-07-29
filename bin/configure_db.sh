#!/bin/bash

echo "Configuring dragonstackdb"

dropdb -U process.env.USER process.env.DATABASE;
createdb -U process.env.USER process.env.DATABASE;

psql -U process.env.USER process.env.DATABASE < ./bin/sql/account.sql;
psql -U process.env.USER process.env.DATABASE < ./bin/sql/generation.sql;
psql -U process.env.USER process.env.DATABASE < ./bin/sql/dragon.sql;
psql -U process.env.USER process.env.DATABASE < ./bin/sql/trait.sql;
psql -U process.env.USER process.env.DATABASE < ./bin/sql/dragonTrait.sql;
psql -U process.env.USER process.env.DATABASE < ./bin/sql/accountDragon.sql;

node ./bin/insertTraits.js

echo "Finished configuring dragonstackdb"
