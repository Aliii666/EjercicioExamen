CREATE USER alquiler_vehiculos_user WITH PASSWORD 'admin123';
CREATE DATABASE alquiler_vehiculos_db OWNER alquiler_vehiculos_user;

\c alquiler_vehiculos_db

ALTER SCHEMA public OWNER TO alquiler_vehiculos_user;
GRANT ALL ON SCHEMA public TO alquiler_vehiculos_user;
GRANT CREATE ON SCHEMA public TO alquiler_vehiculos_user;

ALTER DEFAULT PRIVILEGES FOR USER alquiler_vehiculos_user IN SCHEMA public
GRANT ALL ON TABLES TO alquiler_vehiculos_user;

ALTER DEFAULT PRIVILEGES FOR USER alquiler_vehiculos_user IN SCHEMA public
GRANT ALL ON SEQUENCES TO alquiler_vehiculos_user;

ALTER DEFAULT PRIVILEGES FOR USER alquiler_vehiculos_user IN SCHEMA public
GRANT ALL ON FUNCTIONS TO alquiler_vehiculos_user;


mkdir alquiler_vehiculos_api
cd alquiler_vehiculos_api
python3 -m venv venv
source venv/bin/activate

conectar psql -U restaurantes_user -d restaurantes_db -h localhost
listar: \l
ver tablas: \dt 

estructura: \d nombre_tabla
