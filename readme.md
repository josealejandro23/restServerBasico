# Cascarón básico para montar un server de express.

# En este commit se añadió el manejo de bases de datos por mongo Atlas y en local con docker compose y mongo. La elección de una u otra se hace mediante el node_env del script ejecutado en el package.json

## En la carpeta test hay ejemplos de cómo testear básico con jest y supertest. Importante crear un objeto server de tipo http y exportar la aplicación para así poder testearla con jest. 

### Aquí se hace un test a un CRUD de usuarios completo incluyendo login
## Se añadieron scripts en el package.json para facilitar el test y añadir variables de entorno y así diferenciar ambientes como de desarrollo o producción.

## Recuerden que se debe ejecutar npm install para reconstruir los módulos de node al momento de clonar este repositorio
