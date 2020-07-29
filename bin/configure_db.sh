#!/bin/bash

echo "Configuring dragonstackdb"

dropdb -U qxpzphuzpuciha d9a8dtcvdo2kp0;
createdb -U qxpzphuzpuciha d9a8dtcvdo2kp0;

psql -U qxpzphuzpuciha d9a8dtcvdo2kp0 < ./bin/sql/account.sql;
psql -U qxpzphuzpuciha d9a8dtcvdo2kp0 < ./bin/sql/generation.sql;
psql -U qxpzphuzpuciha d9a8dtcvdo2kp0 < ./bin/sql/dragon.sql;
psql -U qxpzphuzpuciha d9a8dtcvdo2kp0 < ./bin/sql/trait.sql;
psql -U qxpzphuzpuciha d9a8dtcvdo2kp0 < ./bin/sql/dragonTrait.sql;
psql -U qxpzphuzpuciha d9a8dtcvdo2kp0 < ./bin/sql/accountDragon.sql;

node ./bin/insertTraits.js

echo "Finished configuring dragonstackdb"
