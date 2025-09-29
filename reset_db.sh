#!/bin/bash
# Script para eliminar y crear la base de datos nutriapp en PostgreSQL

DB_NAME="nutriapp" # Cambia por el nombre de tu base de datos si es diferente
DB_USER="postgres" # Cambia por tu usuario si es diferente

# Eliminar la base de datos
psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Crear la base de datos
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

echo "Base de datos $DB_NAME eliminada y creada nuevamente."
